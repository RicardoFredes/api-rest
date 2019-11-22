exports.up = function(knex) {
  return knex.schema.createTable("users_teams", function(table) {
    table.increments("id");
    table.integer("user_id");
    table.integer("team_id");
    table.foreign("user_id").references("users.id");
    table.foreign("team_id").references("teams.id");
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
  return knex.schema.dropTable("users_teams");
};
