require("dotenv").config();
require("./config/database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const { checkRole } = require("./middleware/checkRoles");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello");
});

const { registerUser } = require("./Controller/registerController");
const { loginUser } = require("./Controller/loginController");
const { getUsers } = require("./Controller/usersController");
const { getUserById } = require("./Controller/usersByIdController");
const { updateUser } = require("./Controller/updateUsersController");
const { deleteUser } = require("./Controller/deleteUserController");
const { logout } = require("./Controller/logoutController");

/**
 * Faire la documentation (Fait en partie)
 * Faire la toDoList pour  OpenSI
 * Ecrire les routes pour la toDoList
 * comment appliqué l'architecture REST à des routes api
 */

//Pour l'api à mettre dans une copie de ce projet

app.get("/users/:id/taskLists", (req, res) => {
  res.send("Récuperer toute les listes de taches d'un utilisateur");
});

app.get("/users/:id/taskLists/:id", (req, res) => {
  res.send("Récuperer une liste de taches par son id");
});

app.get("/users/:id/taskLists/:id/tasks", (req, res) => {
  res.send("Récuperer la liste des taches dans une taskList");
});

app.get("/users/:id/taskLists/:id/tasks/:id", (req, res) => {
  res.send("Récuperer une tache par son id dans une taskList");
});

app.post("/users/:id/taskLists", (req, res) => {
  res.send("Créer une liste de tache");
});

app.post("/users/:id/taskLists/:id/tasks", (req, res) => {
  res.send("Créer une tache dans une taskList");
});

app.delete("/users/:id/taskLists", (req, res) => {
  res.send("Supprimer toutes les taskLists");
});

app.delete("/users/:id/taskLists/:id", (req, res) => {
  res.send("Supprimer une taskList par son id");
});

app.delete("/users/:id/taskLists/:id/tasks", (req, res) => {
  res.send("Supprimer toutes les taches présente dans une taskList");
});

app.delete("/users/:id/taskLists/:id/tasks/:id", (req, res) => {
  res.send("Supprimer une tache spécifique dans une taskList à travers son id");
});

app.get("/users/:id/taskLists/:id/tasks/tri/dueDate/asc", (req, res) => {
  res.send("Tri d'une liste de tâche suivant la date d'échéance");
});

app.get("/users/:id/taskLists/:id/tasks/tri/priority/asc", (req, res) => {
  res.send("Tri d'une liste de tâche suivant la date d'échéance");
});

//Ancien

app.post("/login", loginUser);

app.post("/logout", logout);

app.get("/users", auth, checkRole("admin"), getUsers);

app.get("/users/:id", auth, checkRole("admin"), getUserById);

app.put("/users/:id", auth, checkRole("admin"), updateUser);

app.delete("/users/:id", auth, checkRole("admin"), deleteUser);

app.get("/users/dashboard", auth, (req, res) => {
  res.status(200).send("Welcome !");
});

app.post("/users", registerUser);

module.exports = app;
