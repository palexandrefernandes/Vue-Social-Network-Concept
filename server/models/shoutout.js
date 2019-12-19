const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Shoutout extends Model {

}

module.exports = Shoutout;