const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Likes extends Model{
    static get tableName(){
        return 'likes';
    }

    static get idColumn(){
        return ['post_id', 'user_id'];
    }

    static get relationshipMappings(){
        const User = require('./user');
        const Post = require('./post');
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'likes.user_id',
                    to: 'users.id'
                }
            },
            post: {
                relation: Model.HasOneRelation,
                modelClass: Post,
                join: {
                    from: 'likes.post_id',
                    to: 'posts.id'
                }
            }
        };
    }
}

module.exports = Likes;