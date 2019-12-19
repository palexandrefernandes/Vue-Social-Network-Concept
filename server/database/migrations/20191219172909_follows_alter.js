
exports.up = function(knex) {
    return knex.schema.alterTable('followers', table => {
        table.renameColumn('follows_id', 'followed_by_id');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('followers', table => {
        table.renameColumn('followed_by_id','follows_id');
    });
};
