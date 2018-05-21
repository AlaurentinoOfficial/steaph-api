import * as jwt from "jsonwebtoken"

import { SolutionSchema } from "../models/solution"
import { Server } from "../../server"
import { Strings } from "../configs/strings"
import { UserSchema } from "../models/user";

exports.Authenticate = Authenticate

export const Mode = {
    AUTH: "Auth",
    ENVIRONMENT: "Environment"
}

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        if(options.mode === Mode.AUTH || options.mode === undefined) {
            let token = req.headers["authorization"].replace("STEAPH ", "")

            jwt.verify(token, Server.get('crypt_key'), (err, result) => {
                if(err || !result) return res.json(Strings.INVALID_TOKEN)

                UserSchema.findOne({_id: result.data}, (er, u) => {
                    if(er || !u)
                        return res.json(Strings.INVALID_USER)
                    
                    res.locals.user = u
                    res.locals.solution = {_id: u.solution}
                    next()
                })
            })
        }
    } 
}