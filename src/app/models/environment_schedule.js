var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentScheduleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.Types.ObjectId, ref:"Environment", childPath:"schedule"},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    day: {type: Number, min: 0, max: 6, required: true}
});
environmentScheduleSchema.plugin(relationship, { relationshipPathName:'environment' });
exports.EnvironmentScheduleSchema = mongoose.model('EnvironmentSchedule', environmentScheduleSchema);