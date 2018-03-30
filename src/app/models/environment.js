import * as mongoose from "mongoose";
import * as relationship from "mongoose-relationship";

let environmentSchema = new mongoose.Schema({
    solution: {type: mongoose.Schema.ObjectId, ref:"Solution", childPath:"environments", required: true, unique: false},
    name: {type: String, required: true, unique: true},
    key: {type: String, required: true, min: 25, max: 25, unique: true},
    status: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentStatus", required: false}],
    schedule: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentSchdule", required: false}]
});
environmentSchema.plugin(relationship, { relationshipPathName:'solution' });
exports.EnvironmentSchema = mongoose.model('Environment', environmentSchema);