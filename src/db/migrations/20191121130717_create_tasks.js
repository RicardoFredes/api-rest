exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments('id')
    table.string('title')
    table.string('text')
    table.boolean('check')
    table.integer('parent_id')
    table.integer('onner_id')
    table.integer('project_id')
    table.foreign('parent_id').references('tasks.id')
    table.foreign('onner_id').references('users.id')
    table.foreign('project_id').references('projects.id')
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
  return knex.schema.dropTable('tasks')
}
