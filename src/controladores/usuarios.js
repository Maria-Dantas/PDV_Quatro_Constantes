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

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    const emailExiste = await knex('usuarios').where('email', email)

    if (emailExiste.length > 0) {
        return res.status(400).json({ mensagem: 'Já existe outro usuário cadastrado com o e-mail informado!' })
    }

    try {

        if (!nome || !email || !senha) {
            return res.status(404).json({ mensagem: 'Todos os campos obrigatórios devem ser informados!' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const criarUsuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning(['id', 'nome', 'email']);


        if (criarUsuario.length === 0) {
            return res.status(400).json('Não foi possível cadastrar o usuário.');
        }

        return res.status(200).json(criarUsuario[0]);

    }
    catch (error) {
        return res.status(500).json(error.message)
    }

}

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(404).json('O usuario não foi encontrado')
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Usuário e/ou senha inválidos!" });
        }

        const token = jwt.sign({ id: usuario.id }, senhajwt, { expiresIn: '8h' })

        const { senha: _, ...usuarioLogado } = usuario;

        return res.status(200).json({ usuario: usuarioLogado, token });


    }
    catch (error) {
        return res.status(500).json(error.message);

    }
}





module.exports = {

    listarCategorias,
    cadastrarUsuario,
    loginUsuario
}