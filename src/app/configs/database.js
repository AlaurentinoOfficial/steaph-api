var mongoose = require('mongoose')
import { green, red, cyan } from 'colors'

exports.DbConfig = (link) => {
    mongoose.connect(link)

    mongoose.connection.on('connected', () => {
        console.log(green('MONGODB>') + ' Connected!')
    });

    mongoose.connection.on('error', (err) => {
        console.log(green('\nMONGODB>') + red(' Connection refused!'))
    });

    mongoose.connection.on('disconnected', () => {
        console.log(green('\nMONGODB>') + ' Disconnected!')
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(cyan('SERVER>') + " Closing server!")
            process.exit(0)
        });
    });
}