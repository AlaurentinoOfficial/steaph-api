var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let solutionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    status: {type: Boolean, default: true, require: false},
    public_key: {type: String, required: true, min: 25, max: 25, unique: true},
    private_key: {type: String, required: true, min: 25, max: 25, unique: true},
    cpf_cnpj: {type: String, required: true},
    type: {type: String, enum: ["physical", "legal"], required: true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref:"User", required: false}],
    environments: [{type: mongoose.Schema.Types.ObjectId, ref:"Environment", required: false}]
})
exports.SolutionSchema = mongoose.model('Solution', solutionSchema)