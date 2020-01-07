const { verifyParameters, formatResponse } = require('../utils/utils');
const Comment = require('../models/comment');

async function makeComment(req, res, next){
    let id = req.params.id;
    let userId = req.user[0].id;
    let text = req.body.comment;

    let comment = await Comment.query().insert({comment: text, creator_id: userId, post_id: id});
    if(comment instanceof Comment){
        res.status(200).json(formatResponse(false, 'Comment created!', comment));
    } else {
        res.status(400).json(formatResponse(true, 'Error creating comment!'))
    }
}


module.exports = {
    makeComment
}
