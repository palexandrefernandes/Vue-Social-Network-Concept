const {Model} = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Shoutout extends Model {
    static get tableName() {
        return 'shoutouts';
    }

    static get idColumn(){
        return ['post_id', 'identified_id'];
    }

    static get relationMappings() {
        const Post = require('./post');
        const User = require('./user');
        return {
            post: {
                relation: Model.BelongsToOneRelation,
                modelClass: Post,
                join: {
                    from: 'shoutouts.post_id',
                    to: 'posts.id'
                }
            },
            by: {
                relation: Model.HasOneThroughRelation,
                modelClass: User,
                join: {
                    from: 'shoutouts.post_id',
                    through: {
                        from: 'posts.id',
                        to: 'posts.creator_id',
                    },
                    to: 'users.id'
                }
            },
            who:{
                relation: Model.BelongsToOneRelation,
                modelName: User,
                join: {
                    from: 'shoutouts.identified_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Shoutout;