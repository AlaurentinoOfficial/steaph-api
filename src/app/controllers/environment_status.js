import { Server } from "../../server"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentStatusSchema } from "../models/environment_status";
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentStatusSchema.find({environment: req.params.id}, (err, doc) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(doc)
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id}, (err, e) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            status: req.body.status,
            power: req.body.power
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