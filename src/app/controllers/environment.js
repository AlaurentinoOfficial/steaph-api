import { EnvironmentSchema } from "../models/environment"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentSchema.find({solution: res.locals.solution._id}, (err, docs) => {
        if(err)
            return res.json([])
        
        res.json(docs);
    })
}

body.add = (req, res) => {
    var body = req.body
    body.solution = res.locals.solution._id
    
    EnvironmentSchema.create(body, (err, docs) => {
        if(err) {
            if(err.code == 11000)
                res.json(Strings.ALREADY_CREATED)
            else
                res.json(Strings.INVALID_ENVIRONMENT)
            return
        }

        res.json(Strings.SUCCEFULY)
    })
}

body.getById = (req, res) => {
    EnvironmentSchema.findOne({solution: res.locals.solution._id, _id: req.params.id}, (err, docs) => {
        if(err)
            return res.json([])
            
        EnvironmentScheduleSchema.find({environment: docs._id}, (er, schedules) => {
            var status = false
            
            schedules.forEach(s => {
                if(_checkTime(s))
                    status = true
            })
            
            docs.status = status
            docs.save()
        })
        
        res.json(docs);
    })
}

body.updateEnvById = (req, res) => {
    EnvironmentSchema.findOneAndUpdate({_id: req.params.id},
        req.body, {upsert: true}, (err) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(Strings.SUCCEFULY)
    })
}

body.deleteEnvById = (req, res) => {
    EnvironmentSchema.remove({_id: req.params.id}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(Strings.SUCCEFULY)
    })
}

exports.EnvironmentController = body