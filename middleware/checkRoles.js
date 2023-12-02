const jwt = require("jsonwebtoken");
const { pool } = require("../config/database");

const config = process.env;

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    const token = req.cookies["access-token"];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }

    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;

      if (!req.user || !req.user.email) {
        return res.status(401).send("Invalid token");
      }

      var userRoles = await pool.query(
        `SELECT roles FROM users WHERE email = $1`,
        [req.user.email]
      );

      if (
        userRoles.rows[0].roles &&
        userRoles.rows[0].roles[0] == requiredRole
      ) {
        next();
      } else {
        res.status(403).send("Vous n'avez pas les autorisations nécessaires.");
      }
    } catch (err) {
      console.log(err);
      return res.status(401).send("Invalid token");
    }
  };
};

module.exports = { checkRole };
