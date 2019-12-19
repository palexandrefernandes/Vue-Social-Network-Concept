const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Post extends Model{
    static get tableName(){
        return 'posts';
    }

    static get idColumn(){
        return 'post_id';
    }

    static get relationshipMappings(){
        const User = require('user');
        const Shoutout = require('shoutout');
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
                model: User,
                join: {
                    from: 'posts.id',
                    through: {
                        from: 'likes.post_id',
                        to: 'like.user_id',
                        extra: ['liked_date']
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
            }
        };
    }
}

module.exports = Post;