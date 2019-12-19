const envoirment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[envoirment];
const knex = require('knex')(knexConfig);

module.exports = knex;