const express = require('express')
const { listarCategorias,criarUsuario } = require('./controladores/usuarios')
const {checarCamposCadastro, checarCamposLogin } = require('./intermediarios/validacao')



const rotas = express()

rotas.post('/login',checarCamposLogin, loginUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/usuarios',criarUsuario)





module.exports = rotas   