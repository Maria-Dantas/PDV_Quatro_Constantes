require('dotenv').config();
const { erroServidor,
    erroAutenticacao,
    erroValidacaoDados,
    erroTransacao } = require('../servicos/mensagens');


const validarEmail = (email) => {
    let emailValido = true;

    if (email.indexOf("@") < 0 || email.indexOf(".") < 0 || email.indexOf(".") === 0 ||
        email.lastIndexOf(".") === email.length - 1 || email.trim() === '') {
        emailValido = false;
        return emailValido;
    };

    if (emailValido) {
        return email.trim();
    };
};

const checarCamposCadastro = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        console.log('Entrou na função')
        return res.status(400).json(erroValidacaoDados[0]);
    }

    return { nome, email, senha };
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
    checarDuplicidadeEmail,
    validarEmail
}
