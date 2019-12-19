const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class File extends Model{
    static get tableName(){
        return 'files';
    }

    static get idColumn(){
        return 'id';
    }
}

module.exports = File;