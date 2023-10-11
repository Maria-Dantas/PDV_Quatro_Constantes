const express = require('express')
const { listarCategorias, cadastrarUsuario } = require('./controladores/usuarios')



const rotas = express()


rotas.get('/categoria', listarCategorias)
rotas.post('/usuarios', cadastrarUsuario)



module.exports = rotas   