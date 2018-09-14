import { EnvironmentSchema } from "../models/environment"
import { EnvironmentModuleSchema } from "../models/environment_module"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
        if(err || !e)
            return res.json([])
        
        EnvironmentModuleSchema.find({environment:e._id}, (err, doc) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT)
            
            res.json(doc)
        })
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
        if(err || !e)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            id: req.body.id,
            name: req.body.name,
            online: req.body.online
        }
    
        EnvironmentModuleSchema.create(b, (er, schedule) => {
            if(er || !schedule)
                return res.json(er)
            
            return res.json(Strings.SUCCEFULY)
        })
    })
}

body.updateById = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
        if(err || !e)
            return res.json([])

        var b = {
            id: req.body.id,
            name: req.body.name,
            online: req.body.online
        }

        EnvironmentModuleSchema.findOneAndUpdate({_id: req.params.id}, b, {upsert: true}, (err, d) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT_MODULE)
            
            res.json(Strings.SUCCEFULY)
        })
    })
}

body.deleteById = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id, solution: res.locals.solution._id}, (err, e) => {
        if(err || !e)
            return res.json([])

        EnvironmentModuleSchema.remove({_id: req.params.id}, (err, d) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT_MODULE)
            
            res.json(Strings.SUCCEFULY)
        })
    })
}

exports.EnvironmentModuleController = body