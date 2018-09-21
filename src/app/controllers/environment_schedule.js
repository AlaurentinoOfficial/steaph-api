import { EnvironmentSchema } from "../models/environment"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    if(res.locals.solution) {
        EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
            if(err || !e)
                return res.json([])
            
            EnvironmentScheduleSchema.find({environment:e._id}, (err, doc) => {
                if(err)
                    return res.json(Strings.INVALID_ENVIRONMENT)
                
                res.json(doc)
            })
        })
    }
    else {
        EnvironmentScheduleSchema.find({}, (err, doc) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT)
            
            res.json(doc)
        })
    }
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
        if(err || !e)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            day: req.body.day
        }
    
        EnvironmentScheduleSchema.create(b, (er, schedule) => {
            if(er || !schedule)
                return res.json(er)
            
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

body.updateById = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
        if(err || !e)
            return res.json([])

        var b = {
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            day: req.body.day
        }

        EnvironmentScheduleSchema.findOneAndUpdate({_id: req.params.id}, b, {upsert: true}, (err, d) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT_SCHEDULE)
            
            res.json(Strings.SUCCEFULY)
        })
    })
}

exports.EnvironmentScheduleController = body