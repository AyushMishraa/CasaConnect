const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        unique: true
    },

    role: {
        type: String,
        enum: ['tenant','owner','admin'],
        default: 'tenant'
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    }
},
{timeseries: true});

// hashing password before saving in DB
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const saltRounds =  await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log("this.password", this.password);
    next();
})

// compare incoming password with the  password stored in DB
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model('user', userSchema);

module.exports = user;