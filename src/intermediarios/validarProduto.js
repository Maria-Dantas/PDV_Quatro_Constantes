const knex = require('../conexao');

const verificarProdutoId = async (req,res,next) => {
    const {id}=req.params;

    const buscaId = await knex('produtos')
        .where({ id })
        .first();

    if (!buscaId) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
    next();
};
module.exports = verificarProdutoId;