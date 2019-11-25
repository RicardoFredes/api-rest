module.exports = {
  client: 'sqlite3',
  debug: true,
  connection: {
    filename: './src/db/data.db',
  },
  migrations: {
    directory: __dirname + '/src/db/migrations',
    tableName: 'migrations',
  },
  pool: { min: 0, max: 10, idleTimeoutMillis: 500 },
  seeds: {
    directory: __dirname + '/src/db/seeds/test',
  },
  useNullAsDefault: true,
}
