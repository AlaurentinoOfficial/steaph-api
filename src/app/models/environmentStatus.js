import * as mongoose from "mongoose";
import * as relationship from "mongoose-relationship";

let environmentStatusSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.ObjectId, ref:"Environment", childPath:"status"},
    status: {type: Boolean, required: true},
    motion: {type: Boolean, required: true},
    temperature: {type: Number, required: true},
    noisy: {type: Number, required: true},
    gas: {type: Number, required: true}
});
environmentStatusSchema.plugin(relationship, { relationshipPathName:'environment' });
exports.EnvironmentStatusSchema = mongoose.model('EnvironmentStatus', environmentStatusSchema);