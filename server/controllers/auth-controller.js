const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secret = 'ThisAintNoSecret';
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
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.query().findOne({email: email});

    console.log(user);

    if(user && await comparePasswords(password, user.password)){
        res.status(200).json({success: {token_type: 'Bearer', token: generateToken(user.id, user.name, 24)}});
    }
    else {
        res.status(400).json({error: 'Credentials dont match'});
    }
}

function generateToken(id, name, durationInHours) {
    return jwt.sign({id: id}, secret, {subject: name, issuer: 'ShoutOut', expiresIn: 60 * 60 * durationInHours});
}

function encryptPassword(password){
    return bcrypt.hash(password, saltRounds).then(hash => hash);
}

function comparePasswords(password, hash){
    return bcrypt.compare(password, hash).then(res => res).catch(err => false);
}

module.exports = {
    signup,
    getToken
};