const bcrypt = require('bcrypt');
const { detalharCategorias,
    verificarEmailExistente,
    emailExisteParaOutrosUsuarios,
    novoUsuario,
    usuarioAtualizado } = require('../servicos/consultas-usuarios');

const listarCategorias = async (req, res) => {
    try {
        const categorias = await detalharCategorias();

        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const usuarioEncontrado = await verificarEmailExistente(email);

        if (usuarioEncontrado) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await novoUsuario(nome, email, senhaCriptografada);

        return res.status(201).json(usuario);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const detalharUsuario = async (req, res) => {
    try {
        return res.json(req.usuario);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha } = req.body;

    try {
        const quantidadeEncontrada = await emailExisteParaOutrosUsuarios(email, id)

        if (quantidadeEncontrada > 0) {
            return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });
        };

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await usuarioAtualizado(nome, email, senhaCriptografada, id);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

module.exports = {
    listarCategorias,
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
}