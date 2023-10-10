const express = require('express')
const { listarCategorias } = require('./controladores/usuarios')



const rotas = express()


rotas.get('/categoria', listarCategorias)



module.exports = rotas   