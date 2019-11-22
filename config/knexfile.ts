export default {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./db/data.db"
  },
  migrations: {
    tableName: "migrations",
    directory: __dirname + "/db/migrations"
  },
  seeds: {
    directory: __dirname + "/db/seeds/test"
  }
};
