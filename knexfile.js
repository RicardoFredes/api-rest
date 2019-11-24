module.exports = {
  client: "sqlite3",
  connection: {
    filename: "./src/db/data.db"
  },
  migrations: {
    directory: __dirname + "/src/db/migrations",
    tableName: "migrations"
  },
  seeds: {
    directory: __dirname + "/src/db/seeds/test"
  },
  useNullAsDefault: true
};
