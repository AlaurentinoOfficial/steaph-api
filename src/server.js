var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import { DbConfig } from './app/configs/database'
import { Router } from './app/configs/router'
import { AllowCrossDomain } from './app/middlewares/cors'
import { SolutionSchema } from './app/models/solution';
import { UserSchema } from './app/models/user';

app.use(AllowCrossDomain)
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.set('token', 'ahdskfjwoikfadsf03i4ohrje0989uh3owefaihojn32whiaeojdsfjaosdkf')
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 8080)

Router(app)
DbConfig("mongodb://localhost:27017/steaph")

// var solution = {
//     name: "NAVE Recife",
//     cpf_cnpj: "12345678901",
//     type: "legal",
// }
// SolutionSchema.create(solution, (err, s) => {
//     if(err) return console.log("Error on create solution!\n"+err)

//     var user = {
//         solution: s,
//         name: "Anderson Laurentino",
//         email: "alaurentino.br@gmail.com",
//         password: "1234567890n",
//         level: "admin",
//         status: "true"
//     }
//     UserSchema.create(user, (err2, u) => {
//         if(err2) console.log("Error on create the user!")

//         console.log("Very very good!")
//     })
// })

exports.Server = app