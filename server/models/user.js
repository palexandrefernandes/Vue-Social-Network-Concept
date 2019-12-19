const {Model} = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const Likes = require('./likes');
        const Shoutouts = require('./shoutout');
        return {
            follows: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'followers.follows_id',
                        to: 'followers.user_id'
                    },
                    to: 'users.id'
                }
            },
            followed: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'followers.user_id',
                        to: 'followers.follows_id'
                    },
                    to: 'users.id'
                }
            },
            shoutouts: {
                relation: Model.HasManyRelation,
                modelClass: Shoutouts,
                join: {
                    from: 'users.id',
                    to: 'shoutouts.identified_id'
                }
            },
            likes: {
                relation: Model.HasManyRelation,
                modelName: Likes,
                join: {
                    from: 'users.id',
                    to: 'likes.user_id'
                }
            }

        }
    }
}

module.exports = User;