const knex = require("../conexao")
const bcrypt = require("bcrypt");


const listarCategorias = async (req, res) => {

    try {
        const listar = await knex('categorias')

        return res.status(200).json(listar)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const criarUsuario = async (req, res) => 
{
    try { 
        const{nome, email, senha} = req.body;
    if (!nome || !email || !senha)
    {
        return res.staus(400).send({mensagem: " Por favor, preencha todos os campos"});

    } 
     const hashSenha = await bcrypt.hash(senha, 10);
     const verificandoEmail = await knex.query('select * from usuarios where email = $1'[email])
     if (emailExiste.rowCount > 0) {
        return res.status(400).send({ mensagem: 'Email já cadastrado, tente outro' })
    }
     const query =
     "INSERT INTO usuarios (name, email,senha) VALUES ($1, $2, $3);"

     const valor =[nome, email, hashSenha];
     const reultado =await knex.query(query, valor);
     return res.status(200).send({mensagem:'cadastro reslizado com sucesso'})


    }
    catch(error){
        return res.status(500).send({mensagem:'Error inesperado'})
    }
}



module.exports = {

    listarCategorias,
    criarUsuario
}