import { Server } from "../../server"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentSchema.findOne({uuid: req.params.uuid}, (err, e) => {
        if(err || !e)
            return res.json([])
        
        EnvironmentScheduleSchema.find({environment:e._id}, (err, doc) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT)
            
            res.json(doc)
        })
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({uuid: req.params.uuid}, (err, e) => {
        if(err || !e)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            day: req.body.day
        }
    
        EnvironmentScheduleSchema.create(b, (err, schedule) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT_SCHEDULE)
            
            return res.json(Strings.SUCCEFULY)
        })
    })
}

body.deleteById = (req, res) => {
    EnvironmentScheduleSchema.remove({_id: req.params.id}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT_SCHEDULE)
        
        res.json(Strings.SUCCEFULY)
    })
}


exports.EnvironmentScheduleController = body