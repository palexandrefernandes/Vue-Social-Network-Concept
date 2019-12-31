const { verifyParameters, formatResponse } = require('../utils/utils');
const Post = require('../models/post');
const Shoutout = require('../models/shoutout');
const Follower = require('../models/follower');

async function addShoutout(req, res, next) {
    let userId = verifyParameters(req.user, 'id', next).id;
    let identifiedId = verifyParameters(req.body, 'identified_id', next).identified_id;
    let following = await Follower.query().where('user_id', '=', userId).andWhere('followed_by_id', '=', identifiedId).andWhere('accepted', '=', true);

    if(following[0] instanceof Follower) {
        let postId = verifyParameters(req.params, 'id', next).id;

        let shoutout = await Shoutout.query().insert({identified_id: identifiedId, post_id: postId});
        if (shoutout instanceof Shoutout) {
            res.status(200).json(formatResponse(false, 'Shoutout added!'));
        } else {
            res.status(400).json(formatResponse(true, 'Shoutout already exists or it was denied!'));
        }
    }
    else{
        res.status(400).json(formatResponse('true', 'The user identified is not following you!'));
    }
}

async function getPendingUserShoutouts(req, res, next){
    let userId = verifyParameters(req.user, 'id', next);
    let shoutouts = await Shoutout.query().where('identified_id', '=', userId).andWhere('confirmed', '=', false);

    if(shoutouts[0] instanceof Shoutout){
        res.status(200).json(formatResponse(false, 'Pending shoutouts', shoutouts));
    }
    else{
        res.status(404).json(formatResponse(true, 'No pending shoutouts!'));
    }
}

async function confirmOrUpdateShoutout(req, res, next){
    let userId = verifyParameters(req.user, 'id', next).id;
    let postId = verifyParameters(req.params, 'id').id;
    let message = verifyParameters(req.body, 'shoutout').shoutout;

    let shoutout = await Shoutout.query().findById([postId, userId]).patch({ shoutout: message, confirmed_date: Shoutout.knex().fn.now()});

    if(shoutout >= 0){
        res.status(200).json(formatResponse(false, 'Shoutout confirmed!'));
    }
    else{
        res.status(400).json(formatResponse(false, 'Error confirming shoutout!'));
    }
}

async function denyShoutout(req, res, next){
    let userId = verifyParameters(req.user, 'id', next).id;
    let postId = verifyParameters(req.params, 'id').id;

    let shoutout = await Shoutout.query().findById([postId, userId]).patch({ confirmed: false, shoutout: null});

    if(shoutout >= 0){
        res.status(200).json(formatResponse(false, 'Shoutout denied!'));
    }
    else{
        res.status(400).json(formatResponse(false, 'Error denying shoutout!'));
    }
}

async function deleteShoutout(req, res, next){
    let postId = verifyParameters(req.params, 'id', next).id;
    let userId = verifyParameters(req.user, 'id', next).id;
    let identifiedId = verifyParameters(req.body, 'identified_id', next).identified_id;

    let shoutout = await Shoutout.query().select('shoutouts.*')
        .join('posts as post', 'shoutouts.post_id', 'posts.id')
        .where('shoutouts.post_id', '=', postId)
        .andWhere('posts.creator_id', '=', userId)
        .andWhere('shoutout.identified_id', '=', identifiedId)
        .andWhere('shoutout.confirmed', '!=', false);

    if(shoutout instanceof Shoutout){
        let del = await shoutout.$query().delete();
        if(del >= 0){
            res.status(200).json(formatResponse(false, 'Shoutout removed'));
        }
        else{
            res.status(400).json(formatResponse(false, 'No shoutout removed!'));
        }
    }
    else{
        res.status(401).json(formatResponse(false, 'Can\'t remove shoutout!'));
    }
}

async function getPostShoutouts(req, res, next){
    let postId = verifyParameters(req.params, 'id', next).id;
    let shoutouts = Post.relatedQuery().for(postId).where('confirmed', true);
    if(shoutouts[0] instanceof shoutouts){
        res.status(200).json(formatResponse(false, 'Confirmed shoutouts', shoutouts));
    }
    else{
        res.status(404).json(formatResponse(true, 'No confirmed shoutouts!'))
    }
}


module.exports = {
    addShoutout,
    getPendingUserShoutouts,
    confirmOrUpdateShoutout,
    denyShoutout,
    deleteShoutout,
    getPostShoutouts
};