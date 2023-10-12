const knex = require('../conexao');

const selecionarUsuariosId = async (id) => {
    const buscaId = await knex('usuarios')
        .where({ id })
        .first();

    return buscaId;
}

const emailExiste = async (email) => {
    const buscaEmail = await knex('usuarios')
        .where({ email })
        .first();
    return buscaEmail;
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

const emailExisteParaOutrosUsuarios = async (email, id) => {
    const buscaEmailOutroUsuario = await knex('usuarios')
        .where({ email })
        .where('id', '!=', id)
        .count();

    return buscaEmailOutroUsuario[0].count;
}

module.exports = {
    selecionarUsuariosId,
    emailExiste,
    usuarioAtualizado,
    emailExisteParaOutrosUsuarios
}