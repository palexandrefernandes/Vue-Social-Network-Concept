
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('likes', (table) => {
        table.integer('post_id').unsigned().references('posts.id');
        table.integer('user_id').unsigned().references('users.id');
        table.primary(['post_id', 'user_id']);
        table.timestamp('liked_date').defaultTo(knex.fn.now());

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('likes');
};
