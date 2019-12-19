const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Comment extends Model {
    static get tableName(){
        return 'comments';
    }

    static get relationMapping(){
        const Post = require('./post');
        const User = require('./user');
        return {
            post:{
                relation: Model.HasOneRelation,
                modelClass: Post,
                join: {
                    from: 'comments.post_id',
                    to: 'posts.id'
                }
            },
            by:{
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'comments.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Comment;