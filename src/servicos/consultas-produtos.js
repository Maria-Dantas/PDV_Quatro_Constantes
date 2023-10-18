const knex = require('../conexao');

const novoProduto = async (descricao, quantidade_estoque, valor, categoria_id) => {
    const insereProduto = await knex('produtos')
        .insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*');

    return insereProduto[0];
};

module.exports = novoProduto;