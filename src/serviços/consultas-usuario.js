const knex = require('../conexao');

const selecionarUsuariosId = async (id) => {
    const buscaId = await knex('usuarios')
        .where({ id })
        .first();

    return buscaId;
}

const emailExisteParaOutrosUsuarios = async (email, id) => {
    const buscaEmailOutroUsuario = await knex('usuarios')
        .where({ email })
        .where('id', '!=', id)
        .count();

    return buscaEmailOutroUsuario[0].count;
}

const usuarioAtualizado = async (nome, email, senhaCriptografada, id) => {
    const atualizaUsuario = await knex('usuarios')
        .where({ id })
        .update({
            nome,
            email,
            senha: senhaCriptografada
        });

    return atualizaUsuario;
}

module.exports = {
    selecionarUsuariosId,
    emailExisteParaOutrosUsuarios,
    usuarioAtualizado
}