const intemService = require("../services/item.service");

const create = async (req,res) =>{
    try{
        const {name,categoria,tipo,descricao,valor,anunciante,foto} = req.body;

    if(!name || !categoria || !tipo || !descricao || !valor || !anunciante || !foto){
        res.status(400).send({message: "envie todos os campos para o registro!"});
        
    }
    else {
    try{const item = await intemService.createService(req.body)

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

const findAll = (req,res) =>{
    itens = [];
    res.send(itens);
}

module.exports = {
    create,
    findAll,
}