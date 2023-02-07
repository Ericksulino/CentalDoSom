const route = require("express").Router();
const itemController = require("../controllers/item.controller");

route.post("/",itemController.create);

route.get("/",itemController.findAll);

module.exports = route;