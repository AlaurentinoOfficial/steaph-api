import * as mongoose from "mongoose";
import * as relationship from "mongoose-relationship";

let environmentScheduleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.ObjectId, ref:"Environment", childPath:"schedule"},
    status: {type: Boolean, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});
environmentScheduleSchema.plugin(relationship, { relationshipPathName:'environment' });
exports.EnvironmentScheduleSchema = mongoose.model('EnvironmentSchedule', environmentScheduleSchema);