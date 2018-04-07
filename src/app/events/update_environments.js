import * as mqtt from "mqtt"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { MongoDB } from "../configs/database"

let UpdateStatus = (connection, updates) => {
    var client  = mqtt.connect(connection)

    client.on('connect', () => {
        updates.forEach(e => {
            client.publish('steaph/things/' + e.environment + "/status",
            '{status:' + e.status + ', key: ' + e.key + '}', {qos: 1, retain: false})
            console.log("Publish> " + e.environment + " -> " + e.status)
        })

        client.end()
    })
}

export var UpdateEnvironments = (connection, delay) => {
    EnvironmentSchema.find({}, (err, envs) => {
        EnvironmentScheduleSchema.find({}, (er, schedules) => {
            if(err || schedules.length == 0) return
    
            var on = []
            var off = []
    
            // Get all the schedules
            schedules.forEach((s) => {
                envs.forEach(ev => {
                    if(String(s.environment) == String(ev._id)) {
                        if(checkTime(s)) {
                            if(on.indexOf(String(ev.id)) == -1)
                                on.push(String(ev.id))
                        }
                        else {
                            if(off.indexOf(String(ev.id)) == -1)
                                    off.push(String(ev.id))
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
    
            setTimeout(() => {UpdateEnvironments(connection, delay)}, delay)
        })
    })
}

let checkTime = (s) => {
    var now = new Date()
    return now > _baseDate(new Date(s.start)) && now <= _baseDate(new Date(s.end))
} 

let _baseDate = function(date) {
    var now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds())
}