
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('posts', (table => {
        table.increments('id').primary();
        table.string('title', 100);
        table.integer('creator_id').unsigned().references('users.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
        table.string('description', 500);
        table.timestamp('post_date').notNullable().defaultTo(knex.fn.now());
        table.integer('views').defaultTo(0);
        table.string('file_path', 500).notNullable();
    }));
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
};
