var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentModuleSchema = new mongoose.Schema({
    // environment: {type: mongoose.Schema.Types.ObjectId, ref:"Environment", childPath:"modules", required: false},
    name: {type: String, required: true},
    address: {type: String, required: true, unique: true}
});

// environmentModuleSchema.plugin(relationship, { relationshipPathName:'solution' });
exports.EnvironmentModuleSchema = mongoose.model('EnvironmentModule', environmentModuleSchema);