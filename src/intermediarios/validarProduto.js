const {verificarProdutoId}= require('../servicos/consultas-produtos');

const validarProduto = async (req,res,next) => {
    const {id}=req.params;

    const produtoExiste= await verificarProdutoId(id);

    if (!produtoExiste) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    next();
};





module.exports = validarProduto
