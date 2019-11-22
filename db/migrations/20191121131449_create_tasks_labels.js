exports.up = function(knex) {
  return knex.schema.createTable("tasks_labels", function(table) {
    table.increments("id");
    table.integer("task_id");
    table.integer("label_id");
    table.foreign("task_id").references("tasks.id");
    table.foreign("label_id").references("labels.id");
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
  return knex.schema.dropTable("tasks_labels");
};
