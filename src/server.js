var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import { DbConfig } from './app/config/database'
import { Router } from './app/configs/router'
import { UpdateEnvironments } from './app/events/update_environments'
import { SolutionSchema } from './app/models/solution'
import { AllowCrossDomain } from './app/middlewares/cors';

app.use(AllowCrossDomain)
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 8080)

var argv = process.argv.slice(2)

Router(app)

DbConfig(
    argv.indexOf("--docker") >= 0
    ? "mongodb://mongo/steaph"
    : "mongodb://localhost:27017/steaph")

UpdateEnvironments({
    host: 'm14.cloudmqtt.com',
    port: 18167,
    username: 'feorjysl',
    password: 'iPAiakR2OQUh',
    clientId: 'steaph-api'
}, 10000)

console.log(new Date())

exports.Server = app