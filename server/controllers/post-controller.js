const Post = require('../models/post');
const Comment = require('../models/comment');
const Likes = require('../models/likes');
const User = require('../models/user');
const Follower = require('../models/follower');
const _ = require('lodash');

const { verifyParameters, formatResponse } = require('../utils/utils');

async function getUserPostsByUser(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);
    let userId = req.user[0].id;

    let posts = await Post.knex().raw(`Select p.* from posts p left join followers f on p.creator_id = f.user_id inner join users u on u.id = p.creator_id where (${id} = ${userId} and p.creator_id = ${userId}) or (p.creator_id = ${id} and ((f.user_id = ${id} and f.followed_by_id = ${userId} and f.accepted = 1) or u.public = 1 or ${id} = ${userId}))`);

    if (posts.length > 0){
        res.status(200).json(formatResponse(false, 'User posts', posts[0]));
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
    let likeCount = await Post.relatedQuery('likedBy').for(id).count('*', {as: 'count'}).limit(1);
    res.status(200).json(formatResponse(false, 'Post like count', likeCount[0]));
}

async function getLikes(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);
    let likes = Post.relatedQuery('likedBy').for(id);
    res.status(200).json(formatResponse(false, 'Post likes', likes));
}

async function getComments(req, res, next){
    let {id} = verifyParameters(req.params, 'id', next);
    let comments = await Post.relatedQuery('comments').for(id);
    console.log(comments);
    if(comments[0] instanceof Comment){
        res.status(200).json(formatResponse(false, 'Post comments', comments));
    }
    else{
        res.status(400).json(formatResponse(true, 'Error fetching comments!'));
    }
}

async function getCommentCount(req, res, next) {
    let {id} = verifyParameters(req.params, 'id', next);
    let commentCount = await Post.relatedQuery('comments').for(id).count('*', {as: 'count'}).limit(1);
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

async function isLiked(req, res, next){
    let id = req.user[0].id;
    let postId = req.params.id;

    let like = await Likes.query().select().where('post_id', '=', postId).andWhere('user_id', '=', id);
    if(like[0] instanceof Likes){
        res.status(200).json(formatResponse(false, 'Is liked'));
    }
    else{
        res.status(400).json(formatResponse(true, 'Is not liked'));
    }
}

async function like(req, res, next){
    let id = req.user[0].id;
    let postId = req.params.id;
    let likes = await Likes.query().insert({user_id: id, post_id: postId});
    if(likes instanceof Likes){
        res.status(200).json(formatResponse(false, 'Liked'));
    }
    else{
        res.status(400).json(formatResponse(true, 'Error liking'));
    }
}

async function unlike(req, res, next){
    let id = req.user[0].id;
    let postId = req.params.id;
    let likes = await Likes.query().delete().where('post_id', '=', postId).andWhere('user_id', '=', id);
    if(likes > 0){
        res.status(200).json(formatResponse(false, 'Uniked'));
    }
    else{
        res.status(400).json(formatResponse(true, 'Error unliking'));
    }
}

async function getFeed(req, res, next){
    let id = req.user[0].id;

    let follows = await User.relatedQuery('follows').for(id).where('followers.accepted', '=', true);
    if(follows[0] instanceof User){
        let ids = [];
        for(let follow of follows){
            ids.push(follow.id);
        }

        if(ids[0]){
            let posts = await Post.query().select().whereIn('creator_id', ids).orderBy('post_date');
            console.log(posts);
            if(posts[0] instanceof Post){
                res.status(200).json(formatResponse(false, 'Feed', posts));
            } else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(404);
        }
    }
    else {
        res.sendStatus(404);
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
    getPost,
    isLiked,
    like,
    unlike,
    getFeed
};