
exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('followers', (table => {
      table.integer('user_id').unsigned().references('users.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('follows_id').unsigned().references('users.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamp('start_following_date').defaultTo(knex.fn.now());
      table.primary(['user_id', 'follows_id']);
      table.boolean('accepted').notNullable().defaultTo(false);
      table.timestamp('accepted_date');
  }));
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('followers');
};
