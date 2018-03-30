var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import { DbConfig } from './app/config/database'
import { Router } from './app/configs/router';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 8080)

var argv = process.argv.slice(2)

Router(app)
DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

exports.Server = app