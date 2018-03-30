import * as jwt from "jsonwebtoken";

import { Server } from "../../server";
import { SolutionSchema } from "../models/solution";
import { Strings } from "../configs/strings";

var body = {}

body.login = (req, res) => {
    SolutionSchema.findOne({email: req.body.email}, (err, solution) => {
        if(err || !solution)
            return res.json(Strings.error.INVALID_EMAIL)

        solution.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err)
            {

                let token = "STEAPH " + jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3,
                                data: solution._id
                            }, Server.get('crypt_key'))
    
                solution.password = null
                solution.token = token
                return res.json(solution)
            }
            else
                return res.json(Strings.error.INVALID_PASSWORD)
        });
    });
}

body.password = (req, res) => {
    var body = {password: req.body.password}

    SolutionSchema.findOneAndUpdate({_id: res.locals.user._id}, body, (err, user) => {
        if(err || !user)
            return res.json(Strings.error.INVALID_USER)
        
        res.json(Strings.error.SUCCEFULY)
    })
}

exports.SolutionController = body