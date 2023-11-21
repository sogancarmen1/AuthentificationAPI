const { pool } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  let { name, email, password, password2 } = req.body;
  //Lancer les requêtes avant de chercher à voir les clg
  //console.log("body", req.body);

  if (!name || !email || !password || !password2)
    return res.status(400).send({ message: "Please enter all fields" });

  if (password.length < 6)
    return res
      .status(400)
      .send({ message: "Password should be at least 6 caracters" });

  if (password != password2)
    return res.status(400).send({ message: "passwords don't match" });

  let hashedPassword = await bcrypt.hash(password, 10);

  const results = await pool.query(
    `SELECT * FROM public.users WHERE email = $1`,
    [email]
  );

  if (results.rows.length > 0) {
    return res.status(409).send({ message: "Email already registered" });
  } else {
    var insertion = await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [name, email.toLowerCase(), hashedPassword]
    );

    if (insertion.rows && insertion.rows.length > 0) {
      const token = jwt.sign(
        { user_id: insertion.rows[0].id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      const updateUserQuery = "UPDATE users SET token = $1 WHERE id = $2";
      await pool.query(updateUserQuery, [token, insertion.rows[0].id]);
    }
    res.status(200).send({ message: "you are now registered. Please log in" });
  }
};

module.exports = {
  registerUser,
};
