
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('followers', (table => {
      table.integer('user_id').unsigned().references('users.id').notNullable();
      table.integer('follows_id').unsigned().references('users.id').notNullable();
      table.timestamp('start_following_date').defaultTo(knex.fn.now());
      table.primary(['user_id', 'follows_id']);
  }));
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('followers');
};
