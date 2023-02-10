const item = require("../models/item");

const createService = (body) => item.create(body);

const findAllService = (offset,limit) => item.find().sort({_id:-1}).skip(offset).limit(limit).populate("anunciante");

const contItens = () => item.countDocuments();

const findByIdService = (id) => item.findById(id);

module.exports = {
    createService,
    findAllService,
    findByIdService,
    contItens,
};