const { Pool } = require("pg");
const pool = new Pool({
  user: "sogan",
  host: "localhost",
  database: "sogan",
  password: "123456789",
  port: 5432,
});

module.exports = { pool };
