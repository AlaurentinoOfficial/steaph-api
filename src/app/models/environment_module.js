var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let environmentModuleSchema = new mongoose.Schema({
    environment: {type: mongoose.Schema.Types.ObjectId, ref:"Environment", childPath:"modules", required: false},
    id: {type: String, required: true},
    name: {type: String, required: true},
    online: {type: Boolean, default: false, required: false}
});

environmentModuleSchema.plugin(relationship, { relationshipPathName:'environment' });
exports.EnvironmentModuleSchema = mongoose.model('EnvironmentModule', environmentModuleSchema);