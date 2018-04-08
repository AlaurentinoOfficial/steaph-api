var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentStatusSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.ObjectId, ref:"Environment", childPath:"status"},
    status: {type: Boolean, required: true},
    power: {type: Number, required: true}
});
environmentStatusSchema.plugin(relationship, { relationshipPathName:'environment' });
export const EnvironmentStatusSchema = mongoose.model('EnvironmentStatus', environmentStatusSchema);