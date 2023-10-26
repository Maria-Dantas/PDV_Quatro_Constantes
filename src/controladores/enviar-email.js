const transportador = require('../validacoes/email');
const fs = require('fs/promises')
const handleabars = require('handleabars')


const compilador = handleabars.compile(
    `<h1>Você fez um pedido com a empresa Quatro Constantes. {{nomecliente}}?</h1>
		<p>Obrigado pela preferência!</p>`
)

const htmlString = compilador({
    nomecliente: nome.cliente_id

})

const arquivo = await fs.readFile();

transportador.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${cliente_id.nome} <${cliente_id.email}>`,
    subject: 'Pedido Realizado.',
    html: htmlString,
})

return res.status(201).json({ mensagem: 'E-mail enviado com sucesso!' });