var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")

let solutionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, enum: ["physical", "legal"], required: true},
    cpf_cnpj: {type: String, required: true},
    status: {type: Boolean, default: true, require: false},
    date_creation: {type: Date, required: false},
    users: [{type: mongoose.Schema.Types.ObjectId, ref:"User", required: false}],
    environments: [{type: mongoose.Schema.Types.ObjectId, ref:"Environment", required: false}]
})

solutionSchema.pre('save', function(next) {
    if(this.isNew)
        this.date_creation = new Date()

    next()
})

exports.SolutionSchema = mongoose.model('Solution', solutionSchema)