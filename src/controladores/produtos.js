const { novoProduto, verificarProdutoId, produtoAtualizado, verificarCategoriaId, detalharProdutos, verificarProdutoExistente } = require('../servicos/consultas-produtos');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoEncontrado = await verificarProdutoExistente(descricao);
        if (produtoEncontrado) {
            return res.status(400).json({ mensagem: 'Já existe um produto cadastrado com a descrição informada.' });
        }

        const produto = await novoProduto(descricao, quantidade_estoque, valor, categoria_id);

        return res.status(201).json(produto);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };

}

const editarProduto = async (req, res) => {
    const { id } = req.params;

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    try {

        await produtoAtualizado(id, descricao, quantidade_estoque, valor, categoria_id);

        return res.status(204).send();
    }

    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
}

const listarProdutos = async (req, res) => {

    const { categoria_id } = req.query;

    try {
        if (categoria_id) {
            const categoriaEncontrada = await verificarCategoriaId(categoria_id);

            if (categoriaEncontrada) {
                return res.status(200).json(categoriaEncontrada);
            }
        }

        const listarProdutos = await detalharProdutos();

        return res.status(200).json(listarProdutos);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
}

const detalharProduto = async (req, res) => {
    const { id } = req.params
    try {
        const produtoEncontrado = await verificarProdutoId(id);

        if (!produtoEncontrado) {
            return res.status(404).json({ mensagem: 'O Produto não foi encontrado.' });

        }
        return res.status(200).json(produtoEncontrado)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }

}
const deletarProduto = async (req, res) => {
    const { id } = req.params

    const IdProdutoEncontrado = await verificarProdutoId(id);
    if (!IdProdutoEncontrado) {
        return res.status(404).json({ mensagem: 'O Produto não foi encontrado.' });

    }
    try {
        if (IdProdutoEncontrado) {
            await knex("produtos").where({ id }).delete()
            return res.status(204).send({ mensagem: 'Produto deletado' })

        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.messege });
    }

}
module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    deletarProduto,
    detalharProduto
}