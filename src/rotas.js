const express = require('express')

const { listarCategorias, criarUsuario, loginUsuario, cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios')
const { checarCamposCadastro, checarCamposLogin, checarDuplicidadeEmail } = require('./intermediarios/validacao')

const verificarUsuarioLogado = require('./intermediarios/autenticacao');



const rotas = express()

rotas.post('/usuario', cadastrarUsuario)

rotas.post('/login', checarCamposLogin, loginUsuario)

//rotas.post('/usuarios', cadastrarUsuario)

rotas.get('/categoria', listarCategorias)


//rotas.post('/usuarios', checarCamposCadastro, checarDuplicidadeEmail, criarUsuario)

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);


module.exports = rotas   