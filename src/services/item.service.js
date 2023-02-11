const Item = require("../models/item");
const item = require("../models/item");

const createService = (body) => item.create(body);

const findAllService = (offset,limit) => item.find().sort({_id:-1}).skip(offset).limit(limit).populate("anunciante");

const contItens = () => item.countDocuments();

const topItemService = () => item.findOne().sort({_id:-1}).populate("anunciante");

const findByIdService = (id) => item.findById(id).populate("anunciante");

module.exports = {
    createService,
    findAllService,
    findByIdService,
    contItens,
    topItemService
};