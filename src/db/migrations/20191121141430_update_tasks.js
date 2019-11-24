exports.up = function(knex) {
  return knex.schema.table('tasks', function(table) {
    table.integer('kanban_step_id')
    table.foreign('kanban_step_id').references('kanbans_steps.id')
  })
}

exports.down = function(knex) {
  return knex.schema.table('tasks', function(table) {
    table.dropColumn('kanban_step_id')
  })
}
