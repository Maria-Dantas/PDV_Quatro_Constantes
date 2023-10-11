const knex = require("../conexao")
const bcrypt = require("bcrypt");


const listarCategorias = async (req, res) => {

    try {
        const listar = await knex('categorias')

        return res.status(200).json(listar)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    const emailExiste = await knex('usuarios').where('email', email).debug()

    if (emailExiste.rowCount > 0) {
        return res.status(400).json({ mensagem: 'Já existe outro usuário cadastrado com o e-mail informado!' })
    }
    try {

        if (!nome || !email || !senha) {
            return res.status(404).json({ mensagem: 'Todos os campos obrigatórios devem ser informados!' })
        }


        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const criarUsuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning(['id', 'nome', 'email']);


        if (criarUsuario.length === 0) {
            return res.status(400).json('Não foi possível cadastrar o usuário.');
        }

        return res.status(200).json(criarUsuario[0]);


    }
    catch (error) {
        return res.status(500).json(error.message);

    }
}





module.exports = {

    listarCategorias,
    cadastrarUsuario,
}



// const bcrypt = require('bcryptjs');

// const senha = 'minhasenha123';

// // Geração do hash
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync(senha, salt);

// console.log('Senha original:', senha);
// console.log('Senha criptografada:', hash);

// // Verificação da senha
// const senhaIncorreta = 'senhaerrada123';
// const senhaCorreta = 'minhasenha123';