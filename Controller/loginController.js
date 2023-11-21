const { pool } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res.status(400).send("All input is required");

  const results = await pool.query(
    `SELECT * FROM public.users WHERE email = $1`,
    [email]
  );

  if (results.rows.length <= 0)
    return res.status(401).send({ message: "Email or password isn't correct" });

  let hashedPassword = results.rows[0].password;

  let testEqualityOfPassword = await bcrypt.compare(password, hashedPassword);

  if (results && testEqualityOfPassword == false)
    return res.status(401).send({ message: "Email or password isn't correct" });

  const token = jwt.sign(
    { user_id: results.id, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  results.token = token;

  return res.status(200).send({ message: "You are connected", data: results });
};

module.exports = { loginUser };
