const mongoose = require("mongoose")
const validator = require("validator")
mongoose.connect("mongodb://localhost:27017/signup", {useNewUrlParser:true, useUnifiedTopology: true})
const bcrypt = require("bcrypt")

const customerSchema = new mongoose.Schema(
    {
        country: String,
        fname: String,
        lname: String,
        email: {type: String,
            trim:true,
            lowercase:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is not valid!')
            }
        }},
        password: {type: String, minlength: 8},

        cpassword: String,
        address: String,
        mobile: String,
        city: String,
        state: String,
        postalcode: String,
    }
)

customerSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        this.cpassword = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

module.exports  =  mongoose.model("Customer", customerSchema)
