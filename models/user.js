const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
//const validate = require('mongoose-validator')

/*
const usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
]

const emailValidator = [
    validate({
        validator: 'matches',
        arguments: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        message: 'Name must be at least 3 characters, max 40, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
]

const passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [5, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
]

const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //name:{type: String, required: true},
    email: {type: String, required: true, unique:true, validate:emailValidator},
    password:{type:String, required:true},
    entries: { type: Schema.Types.Mixed, default: [] }
}, { minimize: false })
*/
/*UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next(); // If password was not changed or is new, ignore middleware

    // Function to encrypt password 
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err) // Exit if error is found
        user.password = hash // Assign the hash to the user's password so it is saved in database encrypted
        next() // Exit Bcrypt function
    })
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password) 
} */

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    entries: { type: Schema.Types.Mixed, default: [] }
},{ minimize: false })


userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, {
        expiresIn: "30d"
      })
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({email})
    if (!user) {
        //throw new Error({ error: 'Invalid login credentials' })
        return user === false
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        //throw new Error({ error: 'Invalid login credentials' })
        return user === false
    }
    return user
}



const User = mongoose.model('User', userSchema)

module.exports = User