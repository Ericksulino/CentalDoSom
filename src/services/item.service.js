const item = require("../models/item");

const createService = (body) => item.create(body);

const findAllService = () => item.find();

const findByIdService = (id) => item.findById(id);

module.exports = {
    createService,
    findAllService,
    findByIdService,
};