
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('shoutouts', (table) => {
        table.integer('post_id').unsigned().references('posts.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('identified_id').unsigned().references('users.id').notNullable().onDelete('CASCADE').onUpdate('CASCADE');
        table.integer('confirmed');
        table.string('shoutout', 100);
        table.timestamp('confirmed_date');
        table.timestamp('shoutout_date').defaultTo(knex.fn.now());
        table.primary(['post_id', 'identified_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('shoutouts');
};
