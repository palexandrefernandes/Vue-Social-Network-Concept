const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Comment extends Model {
    static get tableName(){
        return 'comments';
    }

    static get relationMapping(){
        return {

        };
    }
}

module.exports = Comment;