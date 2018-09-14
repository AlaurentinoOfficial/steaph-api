import { ModuleSchema } from "../models/module"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    ModuleSchema.find({environment:e._id}, (err, doc) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(doc)
    })
}

body.add = (req, res) => {
    var b = {
        environment: req.body.environment,
        id: req.body.id,
        name: req.body.name,
        online: req.body.online
    }

    ModuleSchema.create(b, (er, schedule) => {
        if(er || !schedule)
            return res.json(er)
        
        return res.json(Strings.SUCCEFULY)
    })
}

body.updateById = (req, res) => {
    ModuleSchema.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT_MODULE)
        
        res.json(Strings.SUCCEFULY)
    })
}

body.deleteById = (req, res) => {
    ModuleSchema.remove({_id: req.params.id}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT_MODULE)
        
        res.json(Strings.SUCCEFULY)
    })
}

exports.ModuleController = body