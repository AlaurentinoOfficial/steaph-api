import { Server } from "../../server"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentStatusSchema } from "../models/environment_status";
import { EnvironmentScheduleSchema } from "../models/environment_schedule";
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, env) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json({status: status, key: env.key})
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
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
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, env) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        if(e.schedule.indexOf(req.params.id) != -1) {
            EnvironmentStatusSchema.remove({_id: req.params.id}, (err, doc) => {
                if(err)
                    return res.json(Strings.INVALID_ENVIRONMENT_STATUS)
                
                res.json(Strings.SUCCEFULY)
            })
        }
    })
}


exports.EnvironmentStatusController = body