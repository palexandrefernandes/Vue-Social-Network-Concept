const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const secret = 'ThisAintNoSecret';
const saltRounds = 10;

function signup(req, res, next) {
    let userData = res.body;
    userData.password = encryptPassword(userData.password);
    User.query().insert(userData)
        .then(res => {
            res.status(200).json({success: 'User created'});
        })
        .catch(err => {
            next();
        });
}

async function encryptPassword(password){
    return await bcrypt.hash(password, saltRounds);
}

module.exports = {
    signup,

};