import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { EnvironmentSchema } from "../models/environment"
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
                res.json(Strings.ENV_ALREADY_CREATED)
            else
                res.json(Strings.INVALID_ENVIRONMENT)
            return
        }

        res.json(Strings.SUCCEFULY)
    })
}

body.getById = (req, res) => {
    EnvironmentSchema.findOne({solution: res.locals.solution._id, uuid: req.params.uuid}, (err, docs) => {
        if(err)
            return res.json([])
        
        res.json(docs);
    })
}

body.updateEnvById = (req, res) => {
    EnvironmentSchema.findOneAndUpdate({uuid: req.params.uuid},
        req.body, {upsert: true}, (err) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(Strings.SUCCEFULY)
    })
}

body.deleteEnvById = (req, res) => {
    EnvironmentSchema.remove({uuid: req.params.uuid}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(Strings.SUCCEFULY)
    })
}

exports.EnvironmentController = body