exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id')
    table.string('name')
    table.string('email').unique()
    table.string('thumbnail')
    table.string('password')
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
  return knex.schema.dropTable('users')
}
