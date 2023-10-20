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
const verificarProdutoId = async (id) => {
    const buscaId = await knex('produtos')
        .where({ id })
        .first();

    return buscaId;
};
const produtoAtualizado = async ( id, descricao, quantidade_estoque, valor, categoria_id ) => {
    const atualizaProduto = await knex('produtos')
        .where({ id })
        .update({
            descricao, 
            quantidade_estoque, 
            valor, 
            categoria_id
        })

    return atualizaProduto;
};
const verificarCategoriaId = async (categoria_id) => {
    const buscaId = await knex('produtos')
        .where({ categoria_id })
    return buscaId;
};

const detalharProdutos = async () => {
    const listar = await knex('produtos');

    return listar;
};
module.exports = {novoProduto,verificarProdutoId,produtoAtualizado,verificarCategoriaId,detalharProdutos};