var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set("port", process.env.port || 3000)

exports.Server = app