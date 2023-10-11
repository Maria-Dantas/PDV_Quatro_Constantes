const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config()


const senhajwt = process.env.JWT;


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
    const { nome, email, senha } = req.body
    try { 

     const verificandoEmail = await knex('usuarios').where({ email }).first();
     if (verificandoEmail) {
        return res.status(400).json('O email já existe')
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const usuario = await knex('usuarios')
        .insert({
            nome,
            email,
            senha: senhaCriptografada,
        })
        .returning('*')

    if (!usuario[0]) {
        return res.status(400).json('O usuário não foi cadastrado.')
    }

    return res.status(200).json(usuario[0])

} catch (error) {
    return res.status(400).json(error.message)
}

}

const loginUsuario = async(req, res)=>{
    const { email, senha } = req.body;

    try {
        const { rows } = await knex.query("SELECT * FROM usuarios WHERE email=$1", [email]);

        const senhaValida = await bcrypt.compare(senha, rows[0].senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválidos!" });
        }

        const token = jwt.sign({ usuario_id: rows[0].id }, senhajwt, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = rows[0];

        return res.status(200).json({ usuario: usuarioLogado, token });


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}




module.exports = {

    listarCategorias,
    criarUsuario,
    loginUsuario
}