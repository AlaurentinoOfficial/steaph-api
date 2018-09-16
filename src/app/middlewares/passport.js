import * as jwt from "jsonwebtoken"

import { SolutionSchema } from "../models/solution"
import { Server } from "../../server"
import { Strings } from "../configs/strings"
import { UserSchema } from "../models/user";

exports.Authenticate = Authenticate
exports.Mode = () => {return b}

var Mode = {
    AUTH: "Auth",
    LOCAL_SERVER: "LocalServer"
}


function Authenticate(options) {
    return function Authenticate(req, res, next) {
        let token = req.headers["authorization"]

        if(options.mode === Mode.AUTH || options.mode === undefined) {
            jwt.verify(token, Server.get('crypt_key'), (err, result) => {
                if(err || !result) return res.json(Strings.INVALID_TOKEN)

                UserSchema.findOne({_id: result.data}, (er, u) => {
                    if(er || !u)
                        return res.json(Strings.INVALID_USER)
                    
                    res.locals.user = u
                    res.locals.solution = {_id: u.solution}
                    return next()
                })
            })
        }
        else if(options.mode === Mode.LOCAL_SERVER) {
            if(token == Server.get('token')) {
                res.locals.user = null
                res.locals.solution = null
                return next()
            }
            else
                return res.json(Strings.INVALID_TOKEN)
        }
    } 
}