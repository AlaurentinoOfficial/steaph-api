import * as mqtt from "mqtt"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { EnvironmentStatusSchema } from "../models/environment_status"
import { MongoDB } from "../configs/database"

var client = null
let UpdateStatus = (connection, updates) => {
    client  = mqtt.connect(connection)

    client.on('connect', () => {
        updates.forEach(e => {
            client.publish('steaph/things/' + e.environment.uuid + '/setstatus',
            '{status:' + e.status + ', key: ' + e.environment.key + '}', {qos: 1, retain: false})

            client.subscribe('steaph/things/' + e.environment.uuid + '/status',
            '{status:' + e.status + ', key: ' + e.environment.key + '}', {qos: 1, retain: false})

            console.log("Publish> " + e.environment.uuid + " -> " + e.status)
        })

        client.on('message', function (topic, message) {
            updates.forEach(e => {
                if(topic == 'steaph/things/' + e.environment.uuid + '/status') {
                    
                    try {
                        let msg = JSON.parse(message.toString())

                        let body = {
                            environment: e.environment._id,
                            status: msg.status,
                            power: msg.power
                        }
                        
                        EnvironmentStatusSchema.create(body)
                    }
                    catch(err) {
                        return
                    }
                }
            })
        })
    })
}

export var UpdateEnvironments = (connection, delay) => {
    EnvironmentSchema.find({}, (err, envs) => {
        EnvironmentScheduleSchema.find({}, (er, schedules) => {
            if((err && envs.length == 0) || (er || schedules.length == 0))
                return setTimeout(() => {UpdateEnvironments(connection, delay)}, 5000)
     
            var on = []
            var off = []
    
            // Get all the schedules
            schedules.forEach((s) => {
                envs.forEach(ev => {
                    if(String(s.environment) == String(ev._id)) {
                        if(_checkTime(s)) {
                            if(on.indexOf(ev) == -1)
                                on.push(ev)
                        }
                        else {
                            if(off.indexOf(ev) == -1)
                                off.push(ev)
                        }
                    }
                })
            })
    
            // Remove the repiters
            off.forEach((i) => {
                if(on.indexOf(i) > -1)
                    off.splice(off.indexOf(i), 1)
            })
    
            // Convert to obj
            for(var i = 0; i < on.length; i++)
                on[i] = { environment: on[i], status: "true" }
    
            for(var i = 0; i < off.length; i++)
                off[i] = { environment: off[i], status: "false" }
    
            var buffer = on.concat(off)
            if(buffer.length > 0) UpdateStatus(connection, buffer)

            setTimeout(() => {
                if(buffer.length > 0)
                    client.end();
                
                UpdateEnvironments(connection, delay)
            }, delay)
        })
    })
}

// Check to valid if the environment need turn on or turn off
let _checkTime = (s) => {
    let now = new Date()
    return now > _baseDate(new Date(s.start)) && now <= _baseDate(new Date(s.end)) && now.getUTCDay() == s.day
} 

// Convert the time to just use the hours
let _baseDate = function(date) {
    let now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds())
}
