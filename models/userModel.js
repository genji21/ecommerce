const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true,
        trim: true
    },
    email:  {
        type: String,
        required: true,
        trim: true
    },
    password:  {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0 
    },
    status: {
        type: String, 
        enum: ['Pending', 'Active'],
        default: 'Pending'
      },
    confirmationCode : {
        type : String,
        unique: true
    },
    cart: {
        type: Array,
        default: []
    }
} , {
    timestamps: true
})
module.exports = mongoose.model('Users',userSchema)