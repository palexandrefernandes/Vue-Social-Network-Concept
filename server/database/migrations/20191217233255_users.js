
exports.up = function(knex) {
    return knex.schema.createTable('users', (table => {
        table.increments('id').primary();
        table.string('email', 320).unique().notNullable();
        table.string('name', 255).notNullable();
        table.string('handle', 15).unique().notNullable();
        table.string('description', 500);
        table.date('birth_date').defaultTo(null);
        table.timestamp('join_date').defaultTo(knex.fn.now());
        table.boolean('displayEmail').defaultTo(false);
        table.string('website', 255);
    }));
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
