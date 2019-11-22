exports.up = function(knex) {
  return knex.schema.createTable("comments", function(table) {
    table.increments("id");
    table.string("text");
    table.integer("user_id");
    table.integer("task_id");
    table.foreign("user_id").references("users.id");
    table.foreign("task_id").references("tasks.id");
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
  return knex.schema.dropTable("comments");
};
