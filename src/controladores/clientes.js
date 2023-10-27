const { verificarEmailExistente,
    emailExisteParaOutrosClientes,
    verificarCpfExistente,
    cpfExisteParaOutrosClientes,
    novoCliente,
    clienteAtualizado,
    listar,
    detalhar } = require('../servicos/consultas-clientes');


const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        const emailExiste = await verificarEmailExistente(email);

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });
        };

        const cpfexiste = await verificarCpfExistente(cpf);

        if (cpfexiste) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' });
        };

        const clientes = await novoCliente(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);

        return res.status(201).json(clientes);
    }

    catch (error) {

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };

};

const editarDadosDoCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const emailInformado = await emailExisteParaOutrosClientes(email, id)

        if (emailInformado > 0) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });
        };

        const cpfInformado = await cpfExisteParaOutrosClientes(cpf, id)

        if (cpfInformado > 0) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' });
        };

        await clienteAtualizado(nome, email, id, cpf, cep, rua, numero, bairro, cidade, estado);

        return res.status(204).send();

    } catch (error) {

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const listarClientes = async (req, res) => {
    try {
        const clientes = await listar();

        return res.status(200).json(clientes);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const detalharCliente = async (req, res) => {
    const { id } = req.params
    try {
        const clienteEncontrado = await detalhar(id);

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'O Cliente não foi encontrado.' });

        }
        return res.status(200).json(clienteEncontrado)

    } catch (error) {

        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {

    cadastrarCliente,
    editarDadosDoCliente,
    listarClientes,
    novoCliente,
    detalharCliente,
}

