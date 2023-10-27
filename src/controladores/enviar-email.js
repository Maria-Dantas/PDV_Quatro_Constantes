const transportador = require('../validacoes/email');
const handleabars = require('handleabars');
const knex = require('knex')

const enviarEmail = async (req, res) => {
    const { nome, email } = req.body;

    try {

        const emailExiste = await enviarEmail(cliente_id);
        if (!emailExiste) {
            return res.status(404).json({ mensagem: 'E-mail não encontrado.' })
        }

        const enviarEmail = async (cliente_id) => {
            const email = await knex('clientes')
                .where({ email: cliente_id })

            return email;
        };

        const compilador = handleabars.compile(
            `<h1>Você fez um pedido com a empresa Quatro Constantes. {{nomecliente}}?</h1>
            <p>Obrigado pela preferência!</p>`
        );

        const htmlString = compilador({
            nomecliente: nome.cliente_id,
            email: email.cliente_id

        });

        transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente_id.nome} <${cliente_id.email}>`,
            subject: 'Pedido Realizado.',
            html: htmlString,
        });

        return res.status(201).json({ mensagem: 'E-mail enviado com sucesso!' });
    } catch (error) {

    }
};

module.exports = {
    enviarEmail
}




