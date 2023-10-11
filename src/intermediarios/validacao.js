const checarCamposCadastro = (req, res, next) =>{

    const {nome, email, senha} = req.body;

    if(!nome||!email||!senha){
        return res.status(400).json({mensagem:"Todos os campos devem ser informados"});
    }

    next();
}

const checarCamposLogin = (req, res, next) =>{

    const {email, senha} = req.body;

    if(!email||!senha){
        return res.status(400).json({mensagem:"Todos os campos devem ser informados"});
    }

    next();
}


module.exports = {
    checarCamposCadastro,
    checarCamposLogin
}