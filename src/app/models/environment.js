var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")
import { KafkaProducerSend } from "../configs/kafka"

let environmentSchema = new mongoose.Schema({
    solution: {type: mongoose.Schema.Types.ObjectId, ref:"Solution", childPath:"environments", required: true},
    device_id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    status: {type: Boolean, default: false, required: true},
    plotstatus: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentStatus", required: false}],
    schedule: [{type: mongoose.Schema.Types.ObjectId, ref:"EnvironmentSchedule", required: false}]
});

environmentSchema.post('save', (doc, next) => {
    EnvironmentSchema.find({}, (err, envs) => {
        if(err) return next()

        const payload = [
            {topic: "steaph.environments", messages: envs, partition: 0}
        ]

        KafkaProducerSend(payload, (e, s) => {
            next()
        })
    })
})

environmentSchema.plugin(relationship, { relationshipPathName:'solution' })
exports.EnvironmentSchema = mongoose.model('Environment', environmentSchema)