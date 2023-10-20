const knex = require('../conexao');

const verificarClienteId = async (id) => {
    const buscaId = await knex('cliente')
        .where({ id })
        .first();

    return buscaId;
};

const verificarEmailExistente = async (email) => {
    const buscaEmail = await knex('cliente')
        .where({ email })
        .first();

    return buscaEmail;
};

const emailExisteParaOutrosClientes = async (email, id) => {
    const buscaEmailOutroCliente = await knex('cliente')
        .where({ email })
        .where('id', '!=', id)
        .count();

    return buscaEmailOutroCliente[0].count;
};

const verificarCpfExistente = async (cpf) => {
    const buscaCpf = await knex('cliente')
        .where({ cpf })
        .first();

    return buscaCpf;
};

const cpfExisteParaOutrosCliente = async (cpf, id) => {
    const buscaCpfOutroCliente = await knex('cliente')
        .where({ cpf })
        .where('id', '!=', id)
        .count();

    return buscaCpfOutroCliente[0].count;
};

const detalharClientes = async () => {
    const listar = await knex('clientes');

    return listar;
};


const clienteAtualizado = async (nome, email, cpf, id) => {
    const atualizarCliente = await knex('clientes')
        .where({ id })
        .update({
            nome,
            email,
            cpf
        });

    return atualizarCliente;
};

module.exports = {
    verificarClienteId,
    verificarEmailExistente,
    emailExisteParaOutrosClientes,
    verificarCpfExistente,
    cpfExisteParaOutrosCliente,
    detalharClientes,
    clienteAtualizado
};