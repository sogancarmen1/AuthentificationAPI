const { pool } = require("../config/database");

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    return response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = { deleteUser };
