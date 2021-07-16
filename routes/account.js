const router = require('express').Router();
const Account = require('../model/Account');
const jwt = require('jsonwebtoken');
const {accountLoginValidation} = require('../validation');

//login
router.get('/getToken', async (req, res)=>{
    // validation if there's a bearer token on the request
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(400).send('No token provided')
    }
    const _bearer_token = auth.replace("Bearer ","");
    console.log(_bearer_token)
    if(!_bearer_token){
        return res.status(400).send('No token provided')
    }
    // checking if account with provided secret token exists
    const account = await Account.findOne({secret_token:_bearer_token}) ;
    console.log(account)
    if(!account) return res.status(400).send('Token provided is not valid');

    // create and assign token based on account's public_token
    const token = jwt.sign({_id:account.public_token}, _bearer_token);
    res.header('token', token).send(token);
});

module.exports = router;