const route = require("express").Router();
const itemController = require("../controllers/item.controller");
const authMiddleware = require("../middleware/auth.middlieware");


route.post("/",authMiddleware,itemController.create);

route.get("/",itemController.findAll);

module.exports = route;