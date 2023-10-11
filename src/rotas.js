const express = require('express')

const { listarCategorias, criarUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios')
const { checarCamposCadastro, checarCamposLogin, checarDuplicidadeEmail } = require('./intermediarios/validacao')

const { listarCategorias, cadastrarUsuario } = require('./controladores/usuarios')
const verificarUsuarioLogado = require('./intermediarios/autenticacao');



const rotas = express()

rotas.post('/login', checarCamposLogin, loginUsuario)

rotas.get('/categoria', listarCategorias)


rotas.post('/usuarios', checarCamposCadastro, checarDuplicidadeEmail, criarUsuario)

rotas.use(verificarUsuarioLogado);

rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', atualizarUsuario);

module.exports = rotas   