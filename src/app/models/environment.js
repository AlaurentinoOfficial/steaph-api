var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentSchema = new mongoose.Schema({
    solution: {type: mongoose.Schema.Types.ObjectId, ref:"Solution", childPath:"environments", required: true},
    name: {type: String, required: true},
    status: {type: Boolean, default: false, required: true},
    // modules: [{type: mongoose.Schema.Types.ObjectId, ref:"EnvironmentModule", required: false}],
    plotstatus: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentStatus", required: false}],
    schedule: [{type: mongoose.Schema.Types.ObjectId, ref:"EnvironmentSchedule", required: false}]
});

environmentSchema.plugin(relationship, { relationshipPathName:'solution' });
exports.EnvironmentSchema = mongoose.model('Environment', environmentSchema);