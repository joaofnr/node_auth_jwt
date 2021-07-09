const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

// register
router.post('/register', async (req,res) => {
    //validate data before save
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // checking if e-mail already exists
    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).send('Email already exists')

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create and save the user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try{
        const savedUser = await user.save();
        // res.send(savedUser) whole object
        res.send({user:user._id})
    } catch(err){
        res.status(400).send(err)
    }
});

//login
router.post('/login', async (req, res)=>{
    //validate data before login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // checking if e-mail exists
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email not found')
    
    // checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Wrong password')

    // create and assign token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('token', token).send(token);
});

module.exports = router;