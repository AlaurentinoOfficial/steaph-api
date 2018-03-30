var mongoose = require("mongoose")
var bcrypt = require("bcrypt")
var relationship = require("mongoose-relationship")

let userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    cnpj: {type: String, required: true, unique: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    status: {type: Boolean, default: false, require: false},
    block: {type: Boolean, default: false, require: false},
    token: {type: String, require: false}
})

userSchema.pre('save', function(next) {
    let user = this

    if(this.isNew) {
        user.block = false
        user.status = false
    }

    if(this.isModified('password'))
        user.status = true

    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if(err)
                return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err)
                    return next(err)
                
                user.password = hash
                next()
            });
        });
    }
    else
        return next()
});

userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMath) => {
        if(err)
            return cb(err)

        cb(null, isMath)
    })
}
export const UserSchema = mongoose.model('User', userSchema)