require("dotenv").config();
require("./config/database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

const { registerUser } = require("./Controller/registerController");
const { loginUser } = require("./Controller/loginController");

/**
 * changer le register en createCompte qui sont crée par l'admin
 * CRUD users par l'admin.
 * Les utilisateurs n'ont droit qu'au login et le welcome
 * Faire des recherches sur les rôles.
 * Faire la documentation
 * mettre le projet sur github
 * Faire la toDoList pour  OpenSI
 * Faire interface (Maquette) par rapport à la toDoList
 */

app.post("/users/login", loginUser);

app.get("/users/dashboard", auth, (req, res) => {
  res.status(200).send("Welcome !");
});

app.post("/users/register", registerUser);

module.exports = app;
