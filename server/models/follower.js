const { Model } = require('objection');
const knex = require('../database/knex');
// knex setup
Model.knex(knex);

class Follower extends Model{
    
}

module.exports = Follower;