var mongoose = require("mongoose")
var relationship = require("mongoose-relationship")
var bcrypt = require("bcrypt")

let userSchema = new mongoose.Schema({
    solution: {type: mongoose.Schema.Types.ObjectId, ref:"Solution", childPath:"users", required: true},
    name: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, min: 6, max: 25, required: true},
    level: {type: String, enum: ["admin", "viewer"], default: "admin", required: true},
    status: {type: Boolean, require: true}
})

userSchema.pre('save', function(next) {
    let user = this

    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if(err)
                return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err)
                    return next(err)
                
                user.password = hash
                next()
            })
        })
    }
    else
        return next()
})

userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMath) => {
        if(err)
            return cb(err)

        cb(null, isMath)
    })
}

userSchema.plugin(relationship, { relationshipPathName:'solution' })
exports.UserSchema = mongoose.model('User', userSchema)