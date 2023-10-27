const { novoProduto, verificarProdutoId, produtoAtualizado, verificarCategoriaId, detalharProdutos,
    verificarProdutoExistente, verificarDescricao, atualizarImagem,
    delProdutoid, carregarImagem } = require('../servicos/consultas-produtos');
const { listarTodosPedidos } = require('../servicos/consultas-pedidos');
const { excluirImagem, uploadImagem, } = require('../servicos/uploads');
const knex = require('../conexao');
const validarProduto = require('../intermediarios/validarProduto');
const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { originalname, mimetype, buffer } = req.file

    try {
        const descricaoPadronizada = descricao.toLowerCase();
        const produtoEncontrado = await verificarProdutoExistente(descricaoPadronizada);
        if (produtoEncontrado) {
            return res.status(400).json({ mensagem: 'Já existe um produto cadastrado com a descrição informada.' });
        }

        let produto = await novoProduto(descricaoPadronizada, quantidade_estoque, valor, categoria_id);

        const imagem = await uploadImagem(
            `produtos/${produto.id}/${originalname}`,
            buffer,
            mimetype)

        produto = await knex('produtos').where({ id: produto.id }).update({ produto_imagem: imagem.url }).returning('*');

        return res.status(201).json(produto[0]);
    }
    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    };

}

const editarProduto = async (req, res) => {
    const { id } = req.params;

    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {

        const descricaoPadronizada = descricao.toLowerCase();
        const produtoCadastrado = await verificarDescricao(descricaoPadronizada, id);

        if (produtoCadastrado) {
            return res.status(404).json({ mensagem: 'Já existe produto cadastrado com a descrição informada.' })
        }

        await produtoAtualizado(id, descricaoPadronizada, quantidade_estoque, valor, categoria_id);

        return res.status(204).send();
    }

    catch (error) {
        return res.status(500).json({ mensagem: error.message });
    };
}

const listarProdutos = async (req, res) => {

    const { categoria_id } = req.query;

    try {
        if (!categoria_id) {

            const listarProdutos = await detalharProdutos();

            return res.status(200).json(listarProdutos);
        }

        if (isNaN(categoria_id) || categoria_id < 1 || categoria_id > 9) {
            return res.status(404).json({ mensagem: 'Parâmetro de categoria informado inválido.' })
        }

        const categoriaEncontrada = await verificarCategoriaId(categoria_id);

        if (categoriaEncontrada.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum produto cadastrado na categoria informada.' });
        }

        if (categoriaEncontrada) {
            return res.status(200).json(categoriaEncontrada);
        }

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
    const { id } = req.params;

    const produto_id = id;

    const produtosExistemPedidos = await listarTodosPedidos(produto_id);

    if (produtosExistemPedidos.length > 0) {
        return res.status(400).json({ mensagem: 'O produto está associado a um ou mais pedidos e não pode ser excluído.' });
    }

    try {

        const IdProdutoEncontrado = await verificarProdutoId(id);

        if (!IdProdutoEncontrado) {
            return res.status(404).json({ mensagem: 'O Produto não foi encontrado.' });
        }

        if (IdProdutoEncontrado.imagem) {
            await excluirImagem(IdProdutoEncontrado.imagem);
        }

        await delProdutoid(id);
        return res.status(200).json({ mensagem: 'Produto deletado.' });
    }

    catch (error) {

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const atualizarImagemProduto = async (req, res) => {
    const { originalname, mimetype, buffer } = req.file
    const { id } = req.params;

    try {


        const produtoCadastrado = await validarProduto

        if (produtoCadastrado) {

            return res.status(404).json({ mensagem: 'Já existe produto cadastrado com a descrição informada.' })

        }

        await excluirImagem(produtoCadastrado.produto_imagem)

        const upload = await uploadImagem(
            `produtos/${produtoCadastrado.id}/${originalname}`,
            buffer,
            mimetype)



        const produto = await knex('produtos')
            .where({ id })
            .update({
                produto_imagem: upload.path
            })

        return res.status(204).send();


    } catch (error) {
        return res.status(500).json({ mensagem: error.message });

    }
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    deletarProduto,
    atualizarImagemProduto
}