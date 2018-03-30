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
    body.solution = solution._id
    
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

exports.EnvironmentController = body