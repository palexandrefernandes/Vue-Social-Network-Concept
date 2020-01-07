
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('comments', (table) => {
        table.increments('id').primary();
        table.string('comment', 140).notNullable();
        table.integer('post_id').unsigned().references('posts.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('creator_id').unsigned().references('users.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments');
};
