const { pool } = require("../config/database");

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  if (!name || !email)
    return response.status(400).send({ message: "Please enter new Name and Email" });

  const results = await pool.query(
    `SELECT * FROM public.users WHERE email = $1`,
    [email]
  );

  if (results.rows.length > 0)
    return response.status(409).send({ message: "Email already registered" });
  else {
    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        return response.status(200).send(`User modified with ID: ${id}`);
      }
    );
  }
};

module.exports = { updateUser };
