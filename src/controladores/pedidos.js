const knex = require('../conexao');
const { verificarClienteId } = require('../servicos/consultas-clientes');
const { buscarPedidosCliente, listarApenasPedidos, buscarPedidoId, buscarPedido, novoPedido, valorProduto, inserirPedidosProdutos } = require('../servicos/consultas-pedidos');


const cadastrarPedido = async (req, res) => {
    let { cliente_id, pedido_produtos, observacao } = req.body;

    try {

        if (!cliente_id || !pedido_produtos) {
            return res.status(404).json({ mensagem: 'Todos os campos são obrigatorios.' })
        }
        const clienteExiste = await verificarClienteId(cliente_id);

        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }


        if (pedido_produtos.lenght <= 0) {
            return res.status(404).json({ mensagem: 'A quantidade de produtos tem que ser maior que 0.' })
        }

        let valorTotal = 0

        let produtos = []

        for (let produto of pedido_produtos) {

            let valorproduto = await valorProduto(produto.produto_id)
            valorTotal = valorTotal + (valorproduto * produto.quantidade_produto)

            produtos.push({
                valor: valorproduto,
                id: produto.produto_id,
                quantidade: produto.quantidade_produto,
            })
        }

        const pedido = await novoPedido(observacao, cliente_id, valorTotal);

        for (let produto of produtos) {

            produto.valor *= produto.quantidade
            await inserirPedidosProdutos(
                pedido.id,
                produto.id,
                produto.quantidade,
                produto.valor
            )

        }

        return res.status(201).json(pedido);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }

};

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
                return res.status(404).json({ mensagem: 'Não há pedidos cadastrado para o cliente informado.' })
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
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
};

module.exports = {
    cadastrarPedido,
    listarPedidos
}