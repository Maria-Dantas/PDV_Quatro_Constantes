const express = require('express')
const { listarCategorias,criarUsuario,loginUsuario } = require('./controladores/usuarios')
const {checarCamposCadastro, checarCamposLogin,checarDuplicidadeEmail } = require('./intermediarios/validacao')



const rotas = express()

rotas.post('/login',checarCamposLogin, loginUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/usuarios',checarCamposCadastro,checarDuplicidadeEmail,criarUsuario)





module.exports = rotas   