exports.seed = function(knex) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          name: 'Lucas',
          email: 'lucas@gmail.com',
          thumbnail: undefined,
          password: '123456',
        },
        {
          name: 'João',
          email: 'joao@gmail.com',
          thumbnail: undefined,
          password: '123456',
        },
      ])
    })
}
