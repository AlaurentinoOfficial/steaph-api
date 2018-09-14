var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import { DbConfig } from './app/configs/database'
import { Router } from './app/configs/router'
import { AllowCrossDomain } from './app/middlewares/cors'

app.use(AllowCrossDomain)
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 8080)

Router(app)
DbConfig("mongodb://localhost:27017/steaph")

exports.Server = app