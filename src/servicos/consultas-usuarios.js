const knex = require('../conexao');

const verificarUsuarioId = async (id) => {
    const buscaId = await knex('usuarios')
        .where({ id })
        .first();

    return buscaId;
};

const verificarEmailExistente = async (email) => {
    const buscaEmail = await knex('usuarios')
        .where({ email })
        .first();

    return buscaEmail;
};

const emailExisteParaOutrosUsuarios = async (email, id) => {
    const buscaEmailOutroUsuario = await knex('usuarios')
        .where({ email })
        .where('id', '!=', id)
        .count();

    return buscaEmailOutroUsuario[0].count;
};

const detalharCategorias = async () => {
    const listar = await knex('categorias');

    return listar;
};

const novoUsuario = async (nome, email, senhaCriptografada) => {
    const insereUsuario = await knex('usuarios')
        .insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning('*');

    const { senha: _, ...usuario } = insereUsuario[0];

    return usuario;
};

const usuarioAtualizado = async (nome, email, senhaCriptografada, id) => {
    const atualizaUsuario = await knex('usuarios')
        .where({ id })
        .update({
            nome,
            email,
            senha: senhaCriptografada
        });

    return atualizaUsuario;
};

module.exports = {
    verificarUsuarioId,
    verificarEmailExistente,
    emailExisteParaOutrosUsuarios,
    detalharCategorias,
    novoUsuario,
    usuarioAtualizado
};