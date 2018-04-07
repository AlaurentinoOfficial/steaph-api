import * as jwt from "jsonwebtoken"

import { SolutionSchema } from "../models/solution"
import { Server } from "../../server"
import { Strings } from "../configs/strings"

exports.Authenticate = Authenticate

function Authenticate(options) {
    return function Authenticate(req, res, next) {
        let token = req.headers["authorization"].replace("STEAPH ", "")

        jwt.verify(token, Server.get('crypt_key'), (err, result) => {
            if(err || !result) return res.json(Strings.INVALID_TOKEN)

            SolutionSchema.findOne({_id: result.data}, (er, s) => {
                if(er || !s)
                    return res.json(Strings.INVALID_USER)
                
                res.locals.solution = s
                next()
            })
        })
    } 
}