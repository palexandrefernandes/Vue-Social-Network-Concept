const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {  jwtOptions } = require('../middlewares/passport');
const { verifyParameters, formatResponse } = require('../utils/utils');

const saltRounds = 10;

async function signup(req, res, next) {
    let userData = req.body;
    userData.password = await encryptPassword(userData.password);
    console.log(userData.password);
    User.query().insert(userData)
        .then(user => {
            res.status(200).json({success: 'User created'});
        })
        .catch(err => {
            next(err);
        });
}

async function getToken(req, res, next) {
    let { password, email } = verifyParameters(req.body, ['password', 'email'], next);
    let user = await User.query().findOne({email: email});
    if(user && await comparePasswords(password, user.password)){
        res.status(200).json({success: {token_type: 'Bearer', token: generateToken(user.id, user.name, 24)}});
    }
    else {
        res.status(400).json({error: 'Credentials dont match'});
    }
}

function generateToken(id, name, durationInHours) {
    return jwt.sign({id: id}, jwtOptions.secret, {subject: name, issuer: jwtOptions.issuer, audience: jwtOptions.audience, expiresIn: 60 * 60 * durationInHours});
}

function encryptPassword(password){
    return bcrypt.hash(password, saltRounds).then(hash => hash);
}

function comparePasswords(password, hash){
    return bcrypt.compare(password, hash).then(res => res).catch(err => false);
}

async function emailCheck(req, res, next){
    let email = verifyParameters(req.body, 'email', next).email;
    let user = await User.query().where('email', 'like', email);
    if(user[0] instanceof User){
        res.status(400).json(formatResponse(true, 'Email in use'));
    }
    else{
        res.status(200).json(formatResponse(false, 'Email available'));
    }
}

async function handleCheck(req, res, next){
    let handle = verifyParameters(req.body, 'handle', next).handle;
    let user = await User.query().where('handle', 'like', handle);
    if(user[0] instanceof User){
        res.status(400).json(formatResponse(true, 'Handle in use'));
    }
    else{
        res.status(200).json(formatResponse(false, 'Handle available'));
    }
}

module.exports = {
    signup,
    getToken,
    emailCheck,
    handleCheck
};