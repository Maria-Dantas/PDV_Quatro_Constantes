const knex = require('../conexao');

const verificarClienteId = async (id) => {
    const buscaId = await knex('clientes')
        .where({ id })
        .first();

    return buscaId;
};

const verificarEmailExistente = async (email) => {
    const buscaEmail = await knex('clientes')
        .where({ email })
        .first();

    return buscaEmail;
};

const emailExisteParaOutrosClientes = async (email, id) => {
    const buscaEmailOutroCliente = await knex('clientes')
        .where({ email })
        .where('id', '!=', id)
        .count();

    return buscaEmailOutroCliente[0].count;
};

const verificarCpfExistente = async (cpf) => {
    const buscaCpf = await knex('clientes')
        .where({ cpf })
        .first();

    return buscaCpf;
};

const cpfExisteParaOutrosClientes = async (cpf, id) => {
    const buscaCpfOutroCliente = await knex('clientes')
        .where({ cpf })
        .where('id', '!=', id)
        .count();

    return buscaCpfOutroCliente[0].count;
};

const listar = async () => {
    const listar = await knex('clientes');

    return listar;
};

const detalhar = async (id) => {
    const buscaId = await knex('clientes')
        .where({ id })
        .first();

    return buscaId;
};

const novoCliente = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
    const insereCliente = await knex('clientes')
        .insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*');

    console.log(insereCliente)

    const cliente = insereCliente[0];

    return cliente;
};

const clienteAtualizado = async (nome, email, id, cpf, cep, rua, numero, bairro, cidade, estado) => {
    const atualizarCliente = await knex('clientes')
        .where({ id })
        .update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        });

    return atualizarCliente;
};

module.exports = {
    verificarClienteId,
    verificarEmailExistente,
    emailExisteParaOutrosClientes,
    verificarCpfExistente,
    cpfExisteParaOutrosClientes,
    listar,
    novoCliente,
    clienteAtualizado,
    detalhar
};