const knex = require('../conexao');

const quantidadeDeProduto = async (id) => {
    const quantidade = await knex('produtos')
        .where({ id })
        .first();

    return quantidade;
};

const valorProduto = async (id) => {
    const produto = await knex('produtos')
        .where({ id }).first();

    return produto.valor;
}

const buscarPedidos = async (observacao, valor_total) => {
    const inserePedido = await knex('pedido')
        .insert({

            observacao,
            valor_total

        }).returning('*');

    return inserePedido[0];
};

const novoPedido = async (observacao, cliente_id, valor_total) => {
    const inserePedido = await knex('pedidos')
        .insert({

            observacao,
            cliente_id,
            valor_total

        }).returning('*');

    return inserePedido[0];
};

const buscarPedidosCliente = async (cliente_id) => {
    const buscar = await knex('pedidos')
        .where('cliente_id', cliente_id)
        .count();

    return buscar[0].count;
}

const listarApenasPedidos = async (cliente_id) => {
    if (!cliente_id) {
        const listar = await knex('pedidos')

        return listar;
    }

    const listar = await knex('pedidos')
        .where('cliente_id', cliente_id)

    return listar;
}

const buscarPedidoId = async (pedido) => {
    const listar = await knex('pedido_produtos')
        .where({ pedido_id: pedido.id })

    return listar;
}
const inserirPedidosProdutos = async (
    pedido_id,
    produto_id,
    quantidade_produto,
    valor_produto
) => {
    console.log(
        pedido_id,
        produto_id,
        quantidade_produto,
        valor_produto
    );

    const produto = await knex('pedido_produtos')
        .insert({
            pedido_id,
            produto_id,
            quantidade_produto,
            valor_produto
        })

}

module.exports = {

    quantidadeDeProduto,
    valorProduto,
    buscarPedidos,
    novoPedido,
    buscarPedidosCliente,
    listarApenasPedidos,
    buscarPedidoId,
    inserirPedidosProdutos
};