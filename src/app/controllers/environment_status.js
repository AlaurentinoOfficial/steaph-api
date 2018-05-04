import { Server } from "../../server"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentStatusSchema } from "../models/environment_status";
import { EnvironmentScheduleSchema } from "../models/environment_schedule";
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id}, (err, env) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        EnvironmentScheduleSchema.find({environment: req.params.id}, (er, schedules) => {
            if(err || schedules.length == 0)
                return res.json({status: false, key: env.key})
    
            var status = false;
    
            // Verify all the schedules
            schedules.forEach((s) => {
                if(String(s.environment) == String(env._id))
                    status = !status ? checkTime(s) : false
            })

            res.json({status: status, key: env.key})
        })
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id}, (err, e) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            status: req.body.status,
            power: req.body.power,
            date: new Date()
        }
    
        EnvironmentStatusSchema.create(b, (er, doc) => {
            if(er)
                return res.json(Strings.INVALID_ENVIRONMENT_STATUS)
            
            return res.json(Strings.SUCCEFULY)
        })
    })
}

body.deleteById = (req, res) => {
    EnvironmentStatusSchema.remove({_id: req.params.id}, (err, doc) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT_STATUS)
        
        res.json(Strings.SUCCEFULY)
    })
}


exports.EnvironmentStatusController = body

// Check to valid if the environment need turn on or turn off
export let checkTime = (s) => {
    let now = new Date()
    return now > baseDate(new Date(s.start)) && now <= baseDate(new Date(s.end)) && now.getUTCDay() == s.day
} 

// Convert the time to just use the hours
export let baseDate = function(date) {
    let now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(),date.getMilliseconds())
}