var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let solutionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    status: {type: Boolean, default: false, require: false},
    cpf: {type: String, min: 11, max: 11, required: true},
    cnpj: {type: String, min: 12, max: 14, required: true},
    type: {type: String, enum: ["physical", "legal"], required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref:"User", required: false}],
    environments: [{type: mongoose.Schema.Types.ObjectId, ref:"Environment", required: false}]
})
exports.SolutionSchema = mongoose.model('Solution', solutionSchema)