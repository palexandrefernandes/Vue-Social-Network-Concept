const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Post extends Model{
    static get tableName(){
        return 'posts';
    }

    static get idColumn(){
        return 'id';
    }

    static get relationMappings(){
        const User = require('./user');
        const Shoutout = require('./shoutout');
        const Comment = require('./comment');
        return {
            createdBy:{
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join:{
                    from: 'posts.creator_id',
                    to: 'user.users.id'
                }
            },
            likedBy:{
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'posts.id',
                    through: {
                        from: 'likes.post_id',
                        to: 'likes.user_id',
                        extra: ['liked_date']
                    },
                    to: 'users.id'
                }
            },
            commentedBy:{
                relation: Model.ManyToManyRelation,
                model: User,
                join: {
                    from: 'posts.id',
                    through: {
                        from: 'comments.post_id',
                        to: 'comments.creator_id',
                        extra: ['comment']
                    },
                    to: 'users.id'
                }
            },
            shoutouts:{
                relation: Model.HasManyRelation,
                modelClass: Shoutout,
                join: {
                    from: 'posts.id',
                    to: 'shoutouts.post_id'
                }
            },
            comments: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: 'posts.id',
                    to: 'comments.post_id'
                }
            }
        };
    }
}

module.exports = Post;