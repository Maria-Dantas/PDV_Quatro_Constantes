const express = require('express');
const { listarCategorias, cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios');
const loginUsuario = require('./controladores/login');
const { cadastrarProduto, editarProduto, listarProdutos, detalharProduto, deletarProduto } = require('./controladores/produtos');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const verificarProdutoId = require('./intermediarios/validarProduto');
const usuarioSchema = require('./validacoes/usuarioSchema');
const loginSchema = require('./validacoes/loginSchema');
const produtoSchema = require('./validacoes/produtoSchema');
const { cadastrarCliente, editarDadosDoCliente, listarClientes, detalharCliente } = require('./controladores/clientes');
const clienteSchema = require('./validacoes/clienteSchema');

const rotas = express();

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post('/login', validarRequisicao(loginSchema), loginUsuario);
rotas.use(verificarUsuarioLogado);
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(usuarioSchema), atualizarUsuario);
rotas.post('/produto', validarRequisicao(produtoSchema), cadastrarProduto);
rotas.put('/produto/:id', verificarProdutoId, validarRequisicao(produtoSchema), editarProduto);
rotas.get('/produto', listarProdutos);
rotas.delete('/produto/:id', deletarProduto);
rotas.get('/produto/:id', detalharProduto);

rotas.post('/cliente', validarRequisicao(clienteSchema), cadastrarCliente);
rotas.put('/cliente/:id', editarDadosDoCliente);
rotas.get('/cliente', listarClientes);

rotas.get('/cliente/:id', detalharCliente);


module.exports = rotas;