var mongoose = require("mongoose")

let moduleSchema = new mongoose.Schema({
    environment: {type: String, required: false},
    status: {type: String, default: true, required: false},
    id: {type: String, required: true},
    name: {type: String, required: true},
    online: {type: Boolean, default: false, required: false}
});

exports.ModuleSchema = mongoose.model('Module', moduleSchema);