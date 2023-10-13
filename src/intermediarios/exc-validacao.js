const knex = require('../conexao')

const checarCamposCadastro = (req, res, next) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos devem ser informados" });
    }

    next();
}

const checarCamposLogin = (req, res, next) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos devem ser informados" });
    }

    next();
}
const checarDuplicidadeEmail = async (req, res, next) => {

    const { email } = req.body;

    try {
        const verificandoEmail = await knex('usuarios').where({ email }).first();
        if (verificandoEmail) {
            return res.status(400).json('Já existe usuário cadastrado com o email informado')
        }

        next();

    } catch (error) {
        return res.status(500).json({ "mensagem de erro": error.message });
    }

}


module.exports = {
    checarCamposCadastro,
    checarCamposLogin,
    checarDuplicidadeEmail
}