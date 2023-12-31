const knex = require('../conexao');
const { uploadImagem } = require('./uploads');

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

const verificarProdutoExistente = async (descricaoPadronizada) => {
    const buscaDescricao = await knex('produtos')
        .where( 'descricao',descricaoPadronizada )
        .first();

    return buscaDescricao;
};
const verificarProdutoId = async (id) => {
    const buscaId = await knex('produtos')
        .where({ id })
        .first();

    return buscaId;
};

const verificarDescricao= async(descricaoPadronizada,id) => {
    const produtoExiste= await knex ('produtos')
        .where('descricao',descricaoPadronizada)
        .whereNot('id',id)
        .first();
    
    return produtoExiste;
}
const produtoAtualizado = async (id, descricao, quantidade_estoque, valor, categoria_id) => {
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
const delProdutoid = async (id) => {
    const deletar = await knex("produtos").where({ id }).delete()

    return deletar;

};


module.exports = {
    novoProduto,
    verificarProdutoId,
    verificarDescricao,
    produtoAtualizado,
    verificarCategoriaId,
    detalharProdutos,
    verificarProdutoExistente,
    delProdutoid
};