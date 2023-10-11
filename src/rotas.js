const express = require('express')
const { listarCategorias,criarUsuario } = require('./controladores/usuarios')



const rotas = express()

rotas.post('/login', loginUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/usuarios',criarUsuario)





module.exports = rotas   