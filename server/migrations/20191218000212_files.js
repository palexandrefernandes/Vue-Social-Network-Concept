
exports.up = function(knex) {
    return knex.schema.createTable('files', (table) => {
        table.increments('id').primary();
        table.string('path').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('files');
};
