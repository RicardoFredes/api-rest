exports.seed = function(knex) {
  return knex
    .from('users')
    .select('id', 'email')
    .where({ email: 'joao@gmail.com' })
    .first()
    .then(({ id }) => {
      return knex('tasks')
        .del()
        .then(function() {
          return knex('tasks').insert([
            {
              title: 'First task',
              text: "It's first task",
              check: false,
              onner_id: id,
            },
          ])
        })
    })
}
