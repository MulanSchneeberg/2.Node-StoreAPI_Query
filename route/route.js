const express = require("express");
const route = express.Router();
const getAllTasks = require("../controller/products");

route.route("/").get(getAllTasks);

module.exports = route;
