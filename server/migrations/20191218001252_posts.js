
exports.up = function(knex) {
    return knex.schema.createTable('posts', (table => {
        table.increments('id').primary();
        table.integer('creator_id').unsigned().references('users.id').notNullable();
        table.string('description', 500);
        table.timestamp('post_date').notNullable().defaultTo(knex.fn.now());
        table.integer('views').defaultTo(0);
        table.integer('file_id').unsigned().references('files.id').notNullable();
    }));
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};
