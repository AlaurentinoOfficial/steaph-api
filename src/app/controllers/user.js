import * as jwt from "jsonwebtoken"

import { Server } from "../../server"
import { UserSchema } from "../models/user";
import { Strings } from "../configs/strings"

var body = {}

body.login = (req, res) => {
    UserSchema.findOne({email: req.body.email}, (err, solution) => {
        if(err || !solution)
            return res.json(Strings.INVALID_EMAIL)

        solution.comparePassword(req.body.password, (err, isMatch) => {
            if(isMatch && !err) {
                let token = jwt.sign({
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

    UserSchema.findOneAndUpdate({_id: res.locals.solution._id}, update, (err, user) => {
        if(err || !user)
            return res.json(Strings.INVALID_USER)
        
        res.json(Strings.SUCCEFULY)
    })
}

body.get = (req, res) => {
    let user = {
        solution: res.locals.user.solution,
        name: res.locals.user.name,
        email: res.locals.user.email,
        level: res.locals.user.level,
        status: res.locals.user.status
    }

    res.json(user)
}

exports.UserController = body