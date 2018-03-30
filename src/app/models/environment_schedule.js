var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentScheduleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.Types.ObjectId, ref:"Environment", childPath:"schedule"},
    irraw: {type: Number, enum: [0,1,2], required: true},
    relay: [{type: Number, min: 0, max: 1, required: true}],
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});
environmentScheduleSchema.plugin(relationship, { relationshipPathName:'environment' });
exports.EnvironmentScheduleSchema = mongoose.model('EnvironmentSchedule', environmentScheduleSchema);