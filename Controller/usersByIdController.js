const { pool } = require("../config/database");

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);

  const results = await pool.query(
    `SELECT name, email FROM users WHERE id = ${id}`
  );

  return response.status(200).json(results.rows);
};

module.exports = { getUserById };
