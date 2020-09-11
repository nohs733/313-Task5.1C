const Customer = require ('../models/User')
const bcrypt =require ('bcryptjs')

exports.getHome = (req, res, next) => {
    res.render("/")
};

exports.getRegister = (req, res, next) => {
    res.render("register")
};

exports.postRegister = (req, res, next) => {
    const {email, password, cpassword} = req.body

    Customer.find({email: email}).then(user => {
        
        if (customer) {
            return res.redirect('/register')
        }
        if (password != cpassword) {
            return res.redirect('/register')
        }
        if (password.length < 8) {
            return res.redirect('/register')
        }
        bcrypt.hash(password, 13).then(hashedPass => {
            const newCustomer = new Customer({
                fname: fname,
                lname: lname,
                email: email,
                password: hashedPass
        })
        newCustomer.save().then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}