const itemService = require("../services/item.service");
const fs = require("fs");
const path = require("path");
const { off } = require("process");

const create = async (req,res) =>{
    try{
        const {nome,categoria,tipo,descricao,valor} = req.body;

    if(!nome || !categoria || !tipo || !descricao || !valor){
        res.status(400).send({message: "envie todos os campos para o registro!"});
        
    }
    else {
    try{
        const file = req.file
        console.log( path.basename(file.path));

        const img = path.basename(file.path);
        const item = await itemService.createService({
        nome,
        categoria,
        tipo,
        descricao,
        valor,
        anunciante: req.userId,
        foto: img
    })

    if(!item){
        res.status(400).send({message: "Erro ao criar o Item!"});
        
    }

    res.status(201).send({
        message: "Item criado com sucesso!"
    })} catch(err){
        res.status(500).send({message: err.message});
    }
}
} catch(err){
    res.status(500).send({message: err.message});
}
};

const findAll = async (req,res) =>{
    try{
    let {limit, offset} = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if(!limit){
        limit =5;
    }
    if(!offset){
        offset =0;
    }

    const itens = await itemService.findAllService(offset,limit);
    const total = await itemService.contItens();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous !=null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

    if(itens.length == 0){
        return res.status(400).send({message: "Não há itens cadastrados"});
    }
    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        produtos : itens.map(prodIten => {
            return{
            id: prodIten._id,
            nome: prodIten.nome,
            categoria: prodIten.categoria,
            descricao: prodIten.descricao,
            valor:prodIten.valor,
            foto: prodIten.foto,
            userName : prodIten.anunciante.name,
            userNumber : prodIten.anunciante.number,
            userCity : prodIten.anunciante.city,
            userUF: prodIten.anunciante.state
            }
        })
    });
}catch(err){
    res.status(500).send({message: err.message});
}
    
}

const topItem = async (req,res) => {
    try{
    const prodIten = await itemService.topItemService();

    if(!prodIten){
        return res.status(400).send({message: "Não há item registrado!"});
    }
    res.send({
        item : {
        id: prodIten._id,
        nome: prodIten.nome,
        categoria: prodIten.categoria,
        descricao: prodIten.descricao,
        valor:prodIten.valor,
        foto: prodIten.foto,
        userName : prodIten.anunciante.name,
        userNumber : prodIten.anunciante.number,
        userCity : prodIten.anunciante.city,
        userUF: prodIten.anunciante.state
        }
    });
} catch(err){
    res.status(500).send({message: err.message});
}
}

module.exports = {
    create,
    findAll,
    topItem
}