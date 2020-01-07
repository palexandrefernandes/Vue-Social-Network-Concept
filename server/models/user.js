const {Model} = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn(){
        return 'id';
    }

    static get relationMappings() {
        const Likes = require('./likes');
        const Shoutout = require('./shoutout');
        const Post = require('./post');
        return {
            followers: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'followers.user_id',
                        to: 'followers.followed_by_id',
                        extra: ['start_following_date']
                    },
                    to: 'users.id'
                }
            },
            follows: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'followers.followed_by_id',
                        to: 'followers.user_id',
                        extra: ['start_following_date', 'accepted']
                    },
                    to: 'users.id'
                }
            },
            shoutouts: {
                relation: Model.HasManyRelation,
                modelClass: Shoutout,
                join: {
                    from: 'users.id',
                    to: 'shoutouts.identified_id'
                }
            },
            likes: {
                relation: Model.HasManyRelation,
                modelClass: Likes,
                join: {
                    from: 'users.id',
                    to: 'likes.user_id'
                }
            },
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'users.is',
                    to: 'posts.creator_id'
                }
            }
        }
    }
}

module.exports = User;