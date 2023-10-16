require('dotenv').config();
const jwt = require('jsonwebtoken');
const { verificarUsuarioId } = require('../servicos/consultas-usuarios');
const hash = process.env.JWT;

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    };

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, hash);

        const usuarioEncontrado = await verificarUsuarioId(id);

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        };

        const { senha, ...usuario } = usuarioEncontrado;

        req.usuario = usuario;

        next();

    } catch (error) {
        if (error.message === "invalid token") {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        } else {
            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    };
}

module.exports = verificarUsuarioLogado;