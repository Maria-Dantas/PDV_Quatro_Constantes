const novoProduto = require('../servicos/consultas-produtos');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produto = await novoProduto(descricao, quantidade_estoque, valor, categoria_id);

        return res.status(201).json(produto);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };

}

module.exports = cadastrarProduto;