const knex = require('../conexao');

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

module.exports = { buscarPedidosCliente, listarApenasPedidos, buscarPedidoId };