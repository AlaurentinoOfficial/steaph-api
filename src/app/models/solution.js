var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let solutionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    uuid: {type: String, required: false},
    token: {type: String, required: false},
    status: {type: Boolean, default: true, require: false},
    cpf_cnpj: {type: String, required: true},
    type: {type: String, enum: ["physical", "legal"], required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref:"User", required: false}],
    environments: [{type: mongoose.Schema.Types.ObjectId, ref:"Environment", required: false}]
})
exports.SolutionSchema = mongoose.model('Solution', solutionSchema)