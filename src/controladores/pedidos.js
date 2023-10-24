const { verificarClienteId } = require('../servicos/consultas-clientes');
const { buscarPedidosCliente, listarApenasPedidos, buscarPedidoId } = require('../servicos/consultas-pedidos');

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query;

    try {
        const resultado = [];

        if (cliente_id) {
            const clienteExiste = await verificarClienteId(cliente_id);

            if (!clienteExiste) {
                return res.status(404).json({ mensagem: 'O id do cliente não foi encontrado.' })
            }

            const quantidadePedidos = await buscarPedidosCliente(cliente_id);

            if (quantidadePedidos == 0) {
                return res.status(404).json({ mensagem: 'Não há pedidos cadastrados para o cliente informado.' })
            }
        }

        const pedidos = await listarApenasPedidos(cliente_id);

        for (const pedido of pedidos) {
            const {
                id,
                valor_total,
                observacao,
                cliente_id,
            } = pedido;

            const pedidoId = await buscarPedidoId(pedido);

            const pedidoFormatado = {
                pedido: {
                    id,
                    valor_total,
                    observacao,
                    cliente_id
                },
                pedido_produtos: pedidoId.map(pedido_item => ({
                    id: pedido_item.id,
                    quantidade_produto: pedido_item.quantidade_produto,
                    valor_produto: pedido_item.valor_produto,
                    pedido_id: pedido_item.pedido_id,
                    produto_id: pedido_item.produto_id,
                }))
            };

            resultado.push(pedidoFormatado);
        }

        return res.json(resultado);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
};

module.exports = {
    listarPedidos
}