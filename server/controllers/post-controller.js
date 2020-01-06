const Post = require('../models/post');
const Comment = require('../models/comment');
const Likes = require('../models/likes');
const User = require('../models/user');
const _ = require('lodash');

const { verifyParameters, formatResponse } = require('../utils/utils');

async function getUserPostsByUser(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);

    let posts = await Post.query().where('creator_id', '=', id);

    if (posts.length > 0){
        res.status(200).json(formatResponse(false, 'User posts', posts));
    }
    else {
        res.status(404).json(formatResponse(true, 'No posts found for this user!'));
    }
}

// might need upload
async function createPost(req, res, next) {
    let info = {title, description} = verifyParameters(req.body, ['title', 'description'], next);
    info.file_path = req.file.filename;
    _.assign(info, {creator_id: req.user[0].id});
    let post = await Post.query().insert(info);
    if( post instanceof Post){
        res.status(200).json(formatResponse(false, 'Post created!'));
    } else {
        res.status(400).json(formatResponse(true, 'Error creating the post!'));
    }

}


async function deletePost(req, res, next) {
    let userId = req.user[0].id;
    let postId = verifyParameters(req.params, 'id', next).id;

    console.log(userId);

    let post = await Post.query().delete().where('id', '=', postId).where('creator_id', '=', userId);
    if(post > 0){
        res.status(200).json(formatResponse(false, 'Post deleted!'));
    }
    else{
        res.status(400).json(formatResponse(false, 'Couldn\'t delete the post!'));
    }
}

async function getLikeCount(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);
    let likeCount = await Post.$relatedQuery('likedBy').for(id).count().limit(1);
    res.status(200).json(formatResponse(false, 'Post like count', likeCount[0]));
}

async function getLikes(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);
    let likes = Post.$relatedQuery('likedBy').for(id);
    res.status(200).json(formatResponse(false, 'Post likes', likes));
}

async function getComments(req, res, next){
    let {id} = verifyParameters(req.params, 'id', next);
    let comments = Post.$relatedQuery('commentedBy').for(id);
    res.status(200).json(formatResponse(false, 'Post comments', comments));
}

async function getCommentCount(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);
    let commentCount = await Post.$relatedQuery('comments').for(id).count().limit(1);
    res.status(200).json(formatResponse(false, 'Post comment count', commentCount[0]));
}

async function getPost(req, res, next){
    let id = verifyParameters(req.params, 'id', next);
    let post = await Post.query().findById(id);
    if(post instanceof Post){
        res.status(200).json(formatResponse(false, 'Post found!', post));
    }
    else{
        res.status(404).json(formatResponse(true, 'Post not found!'));
    }
}


module.exports = {
    createPost,
    deletePost,
    getLikeCount,
    getCommentCount,
    getUserPostsByUser,
    getLikes,
    getComments,
    getPost
};