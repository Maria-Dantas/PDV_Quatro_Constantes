require('dotenv').config();
const jwt = require('jsonwebtoken');
const { erroServidor, erroAutenticacao } = require('../servicos/mensagens');
const { selecionarUsuariosId } = require('../servicos/consultas-usuarios');


const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json(erroAutenticacao[0]);
    };

    const token = authorization.split(' ')[1];

    try {

        const { id } = jwt.verify(token, process.env.SENHA_JWT);

        const usuarioEncontrado = await selecionarUsuariosId(id);

        if (!usuarioEncontrado) {
            return res.status(404).json(erroAutenticacao[1]);
        };

        const { senha, ...usuario } = usuarioEncontrado;

        req.usuario = usuario;

        next();

    } catch (error) {
        if (error.message === "invalid token") {
            return res.status(401).json(erroAutenticacao[0]);
        } else {
            return res.status(500).json(erroServidor);
        }
    };
}

module.exports = verificarUsuarioLogado;