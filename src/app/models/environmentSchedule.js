var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentScheduleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.Types.ObjectId, ref:"Environment", childPath:"schedule"},
    status: {type: Boolean, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});
environmentScheduleSchema.plugin(relationship, { relationshipPathName:'environment' });
exports.EnvironmentScheduleSchema = mongoose.model('EnvironmentSchedule', environmentScheduleSchema);