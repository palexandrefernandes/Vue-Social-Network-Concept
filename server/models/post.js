const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Post extends Model{
    static get tableName(){
        return 'posts';
    }

    static get relationshipMappings(){
        const User = require('user');
        return {
            createdBy:{
                relation: Model.HasOneRelation,
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
                        to: 'like.user_id'
                    },
                    to: 'users.id'
                }
            },
        };
    }
}

module.exports = Post;