exports.up = function(knex) {
  return knex.schema.createTable("teams", function(table) {
    table.increments("id");
    table.string("name");
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("teams");
};
