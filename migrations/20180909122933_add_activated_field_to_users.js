exports.up = function(knex, Promise) {
  return knex.schema.table("users", function(table) {
    table
      .boolean("activated")
      .notNull()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", function(table) {
    table.dropColumn("activated");
  });
};
