exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('users', (table => {
        table.increments('id').primary();
        table.string('email', 320).unique().notNullable();
        table.string('name', 255).notNullable();
        table.string('handle', 15).unique().notNullable();
        table.string('description', 500);
        table.date('birth_date').defaultTo(null);
        table.timestamp('join_date').defaultTo(knex.fn.now());
        table.boolean('public').defaultTo(false);
        table.string('password').notNullable();
        table.string('profile_image', 255).defaultTo('default.png').notNullable();
    }));
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
