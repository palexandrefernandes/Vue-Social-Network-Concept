const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Follower extends Model{
    static get tableName(){
        return 'followers';
    }

    static get relationMappings(){
        const User = require('./user');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'followers.user_id',
                    to: 'users.id'
                }
            },
            followed: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'followers.followed_by_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Follower;