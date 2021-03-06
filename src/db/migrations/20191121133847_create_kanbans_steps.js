exports.up = function(knex) {
  return knex.schema.createTable('kanbans_steps', function(table) {
    table.increments('id')
    table.string('name')
    table.integer('order')
    table.integer('kanban_id')
    table.foreign('kanban_id').references('kanbans.id')
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now())
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('kanbans_steps')
}
