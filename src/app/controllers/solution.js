import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { SolutionSchema } from "../models/solution"
import { Strings } from "../configs/strings"

var body = {}

body.login = (req, res) => {
    SolutionSchema.findOne({email: req.body.email}, (err, solution) => {
        if(err || !solution)
            return res.json(Strings.INVALID_EMAIL)

        solution.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err) {
                let token = "STEAPH " + jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60) * 3,
                                data: solution._id
                            }, Server.get('crypt_key'))
    
                return res.json({token: token})
            }
            else
                return res.json(Strings.INVALID_PASSWORD)
        })
    })
}

body.password = (req, res) => {
    var update = {password: req.body.password}

    SolutionSchema.findOneAndUpdate({_id: res.locals.solution._id}, update, (err, user) => {
        if(err || !user)
            return res.json(Strings.INVALID_USER)
        
        res.json(Strings.SUCCEFULY)
    })
}

body.get = (req, res) => {
    let solutionObj = {
        status: res.locals.solution.status,
        environments: res.locals.solution.environments,
        _id: res.locals.solution._id,
        name: res.locals.solution.name,
        email: res.locals.solution.email
    }

    res.json(solutionObj)
}

exports.SolutionController = body