
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('files', (table) => {
        table.increments('id').primary();
        table.string('path').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('files');
};
