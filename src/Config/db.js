const postgres = require("postgres");

const sql = postgres("", {
  host: "localhost", // Postgres ip address[s] or domain name[s]
  port: 6000, // Postgres server port[s]
  database: "HRdb", // Name of database to connect to
  username: "postgres", // Username of database user
  password: "postgres", // Password of database user
});

// Test the connection
sql`SELECT 1`
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Failed to connect to PostgreSQL", err));
module.exports = sql;
