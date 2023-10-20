const { verificarEmailExistente,
    emailExisteParaOutrosClientes,
    verificarCpfExistente,
    cpfExisteParaOutrosClientes,
    detalharClientes,
    novoCliente,
    clienteAtualizado } = require('../servicos/consultas-clientes');


const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body

    try {
        const emailExiste = await verificarEmailExistente(email);

        if (emailExiste) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });
        };

        const cpfexiste = await verificarCpfExistente(cpf);

        if (cpfexiste) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' });
        };

        const cliente = await novoCliente(nome, email, cpf);

        return res.status(201).json(cliente);
    }
    catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const editarDadosDoCliente = async (req, res) => {
    const { id } = req.cliente;
    const { nome, email, cpf } = req.body;

    try {
        const emailInformado = await emailExisteParaOutrosClientes(email, id)

        if (emailInformado > 0) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });
        };

        const cpfInformado = await cpfExisteParaOutrosClientes(cpf, id)

        if (cpfInformado > 0) {
            return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' });
        };

        await clienteAtualizado(nome, email, cpf, id);

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};


const listarClientes = async (req, res) => {
    try {
        const clientes = await detalharClientes();

        return res.status(200).json(clientes);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};


const detalharCliente = async (req, res) => {

    try {
        return res.json(req.clientes);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

module.exports = {

    cadastrarCliente,
    editarDadosDoCliente,
    listarClientes,
    detalharCliente,
}

