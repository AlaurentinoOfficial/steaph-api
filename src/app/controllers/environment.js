import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { EnvironmentSchema } from "../models/environment";
import { Strings } from "../configs/strings";

var body = {}

body.get = (req, res) => {
    res.json(res.locals.solution.environments);
}

body.addEnv = (req, res) => {
    var body = req.body;
    body.solution = res.locals.solution._id
    
    EnvironmentSchema.create(body, (err, docs) => {
        if(err) {
            if(err.code == 11000)
                res.json(Strings.ENV_ALREADY_CREATED);
            else
                res.json(Strings.INVALID_ENVIRONMENT);
            return;
        }

        res.json(Strings.SUCCEFULY);
    });
}

body.updateEnvById = (req, res) => {
    EnvironmentSchema.findOneAndUpdate({_id: req.params.id, solution: res.locals.solution._id},
        req.body, {upsert: true}, (err) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT);
        
        res.json(Strings.SUCCEFULY);
    });
}

body.deleteEnvById() = (req, res) => {
    EnvironmentSchema.remove({solution: res.locals.solution._id, _id: req.params.id}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT);
        
        res.json(Strings.SUCCEFULY);
    })
}

exports.EnvironmentController = body