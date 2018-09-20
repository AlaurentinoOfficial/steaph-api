import express from 'express'
import bodyParser from 'body-parser'

import { MongoDBInit } from './app/configs/database'
import { Router } from './app/configs/router'
import { AllowCrossDomain } from './app/middlewares/cors'
import { SolutionSchema } from './app/models/solution';
import { UserSchema } from './app/models/user';
import { KafkaInit } from './app/configs/kafka';

//======================
//   Express CONFIG
//======================
var app = express()
app.use(AllowCrossDomain)
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.set('token', 'ahdskfjwoikfadsf03i4ohrje0989uh3owefaihojn32whiaeojdsfjaosdkf')
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 8080)
//======================

//======================
//     APP CONFIG
//======================
Router(app)
MongoDBInit("mongodb://localhost:27017/steaph")
KafkaInit("http://127.0.0.1:9022")
//======================

exports.Server = app