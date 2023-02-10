const route = require("express").Router();
const itemController = require("../controllers/item.controller");
const authMiddleware = require("../middleware/auth.middlieware");
const upload = require("../middleware/img.middleware")


route.post("/",authMiddleware,upload.single("file"),itemController.create);

route.get("/",itemController.findAll);

module.exports = route;