var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentModuleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.Types.ObjectId, ref:"Environment", childPath:"environments", required: true},
    name: {type: String, required: true},
    address: {type: String, required: true, min: 25, max: 25, unique: true},
    status: {type: Boolean, default: false, required: true},
    plotstatus: [{type: mongoose.Schema.ObjectId, ref:"EnvironmentStatus", required: false}],
    schedule: [{type: mongoose.Schema.Types.ObjectId, ref:"EnvironmentSchdule", required: false}]
});

environmentModuleSchema.plugin(relationship, { relationshipPathName:'solution' });
exports.EnvironmentModuleSchema = mongoose.model('EnvironmentModule', environmentModuleSchema);