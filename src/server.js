var express = require('express')
var app = express()
var bodyParser = require('body-parser')

import {DbConfig} from './app/config/database'

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.set('crypt_key', 'dfhads8g3bfosdfs')
app.set('port', process.env.PORT || 3000)

var argv = process.argv.slice(2)
DbConfig(argv.indexOf("--docker") >= 0 ? "mongodb://mongo/CRM" : "mongodb://localhost:27017/CRM")

exports.Server = app