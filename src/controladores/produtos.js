const { novoProduto, verificarProdutoId, produtoAtualizado, verificarCategoriaId, detalharProdutos,
    verificarProdutoExistente,verificarDescricao,
    delProdutoid } = require('../servicos/consultas-produtos');
const {listarTodosPedidos}= require('../servicos/consultas-pedidos');
const{excluirImagem}=require('../servicos/uploads');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const descricaoPadronizada = descricao.toLowerCase();

        const produtoEncontrado = await verificarProdutoExistente(descricaoPadronizada);
        if (produtoEncontrado) {
            return res.status(400).json({ mensagem: 'Já existe um produto cadastrado com a descrição informada.' });
        }

        const produto = await novoProduto(descricaoPadronizada, quantidade_estoque, valor, categoria_id);

        return res.status(201).json(produto);
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

        const produtoCadastrado= await verificarDescricao (descricaoPadronizada,id);

        if(produtoCadastrado){
            return res.status(404).json({mensagem:'Já existe produto cadastrado com a descrição informada.'})
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
        if(!categoria_id){

             const listarProdutos = await detalharProdutos();

            return res.status(200).json(listarProdutos);
        }

        if(isNaN(categoria_id ) || categoria_id < 1 || categoria_id > 9){
            return res.status(404).json({mensagem:'Parâmetro de categoria informado inválido.'})
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

    const produto_id=id;

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

        if (!esvaziarCampoImagem) {
            return res.status(400).json("O produto não foi excluido.");
        }

        await delProdutoid(id);
        return res.status(200).json({ mensagem: 'Produto deletado.' });
    }

    catch (error) {

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProduto,
    deletarProduto
}