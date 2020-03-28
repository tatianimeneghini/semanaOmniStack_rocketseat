const express = require("express");

//Requisita o acesso dos controllers
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");


const routes = express.Router();

//Rotas:
//Login
routes.post("/session", SessionController.create);

//ONGs
routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

//Profile
routes.get("/profile", ProfileController.index);

//Incidents
routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;