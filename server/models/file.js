const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class File extends Model{

}

module.exports = File;