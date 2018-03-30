import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentScheduleSchema.find({environment: req.params.id, solution: res.locals.solution._id}, (err, doc) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(doc)
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.env}, (err, e) => {
        if(err || !e)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            irraw: req.body.irraw,
            relay: req.body.relay
        }
    
        EnvironmentScheduleSchema.create(b, (err, e) => {
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