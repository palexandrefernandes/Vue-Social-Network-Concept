const User = require('../models/user');
const { verifyParameters, formatResponse } = require('../utils/utils');
const _ = require('lodash');


async function getUserById(req, res, next) {
    let {id} = verifyParameters(req.params, ['id'], next);
    let user = await User.query().findById(id);

    if(user instanceof User){
        user = _.omit(user, ['password']);
        res.status(200).json(formatResponse(false, 'User found!', user));
    }
    else {
        res.status(404).json(formatResponse(true, 'User was not found!'));
    }
}

async function searchUsers(req, res, next) {
    let {q} = req.params;
    let users = await User.query().select('id', 'name', 'handle', 'description', 'profile_image').where('handle', 'like', `%${q}%`).orWhere('name', 'like', `%${q}%`);

    if(users[0] instanceof User){
        res.status(200).json(formatResponse(false, 'User found!', users));
    }
    else {
        res.status(404).json(formatResponse(true, 'Users were not found!'));
    }
}

// Will need upload and such
async function updateUserProfile(req, res, next){
    let id = req.user[0].id;
    let update = {};
    if(req.body.name)
        _.assign(update, {name: req.body.name});
    if(req.body.description)
        _.assign(update, {description: req.body.description});

    if(req.body.public){
        _.assign(update, {"public": true});
    }
    else{
        _.assign(update, {"public": false});
    }

    if(req.file)
        _.assign(update, {profile_image: req.file.filename});

    let user = await User.query().findById(id).patch(update);
    console.log(user);
    if(user > 0){
        res.status(200).json(formatResponse(false, 'User updated!'));
    }
    else{
        res.status(400).json(formatResponse(false, 'Error updating user!'));
    }

}

async function deleteUserAccount(req, res, next) {
    let {id} = req.params;
    const numDeleted = await User.query().deleteById(id);
    if(numDeleted > 1){
        res.status(200).json(formatResponse(false, 'User was deleted!'));
    }
    else{
        req.status(404).json(formatResponse(true, 'User was not found ro couldn\'t be deleted!'));
    }
}



module.exports = {
    getUserById,
    searchUsers,
    updateUserProfile,
    deleteUserAccount
};