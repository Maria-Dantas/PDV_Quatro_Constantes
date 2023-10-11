const express = require('express')

const { listarCategorias, criarUsuario, loginUsuario } = require('./controladores/usuarios')
const { checarCamposCadastro, checarCamposLogin, checarDuplicidadeEmail } = require('./intermediarios/validacao')

const { listarCategorias, cadastrarUsuario } = require('./controladores/usuarios')




const rotas = express()

rotas.post('/login', checarCamposLogin, loginUsuario)

rotas.post('/usuarios', cadastrarUsuario)

rotas.get('/categoria', listarCategorias)


rotas.post('/usuarios', checarCamposCadastro, checarDuplicidadeEmail, criarUsuario)




module.exports = rotas   