const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class User extends Model{
    static get tableName(){
        return 'users';
    }

    static get relationMappings(){
        const Likes = require('./likes');
        return {
            followers: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join:{
                    from: 'users.id',
                    through: {
                        from: 'followers.follows_id',
                        to: 'followers.user_id'
                    },
                    to: 'users.id'
                }
            },
            follows: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join:{
                    from: 'id',
                    through: {
                        from: 'followers.user_id',
                        to: 'followers.follows_id'
                    },
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = User;