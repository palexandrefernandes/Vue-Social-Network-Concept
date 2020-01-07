
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('likes', (table) => {
        table.integer('post_id').unsigned().references('posts.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
        table.primary(['post_id', 'user_id']);
        table.timestamp('liked_date').defaultTo(knex.fn.now());

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('likes');
};
