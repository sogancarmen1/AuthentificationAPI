const { pool } = require("../config/database");

const getUsers = async (request, response) => {
  await pool.query(
    "SELECT name, email FROM users ORDER BY id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      return response.status(200).json(results.rows);
    }
  );
};

module.exports = { getUsers };
