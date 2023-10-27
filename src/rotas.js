const express = require('express');
const { listarCategorias, cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios');
const loginUsuario = require('./controladores/login');
const { cadastrarProduto, editarProduto, listarProdutos, detalharProduto, deletarProduto, atualizarImagemProduto } = require('./controladores/produtos');
const verificarUsuarioLogado = require('./intermediarios/autenticacao');
const validarRequisicao = require('./intermediarios/validarRequisicao');
const validarProduto = require('./intermediarios/validarProduto');
const usuarioSchema = require('./validacoes/usuarioSchema');
const loginSchema = require('./validacoes/loginSchema');
const produtoSchema = require('./validacoes/produtoSchema');
const { cadastrarCliente, editarDadosDoCliente, listarClientes, detalharCliente } = require('./controladores/clientes');
const clienteSchema = require('./validacoes/clienteSchema');
const { listarPedidos, cadastrarPedido } = require('./controladores/pedidos');
const multer = require('./intermediarios/multer');
//const {carregarImagem} = require('./servicos/carregarImagem');
const { uploadImagem } = require('./servicos/uploads');


const rotas = express();

rotas.get('/categoria', listarCategorias);
rotas.post('/usuario', validarRequisicao(usuarioSchema), cadastrarUsuario);
rotas.post('/login', validarRequisicao(loginSchema), loginUsuario);
rotas.use(verificarUsuarioLogado);
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', validarRequisicao(usuarioSchema), atualizarUsuario);

rotas.post('/produto', multer.single('produto_imagem'),validarRequisicao(produtoSchema), cadastrarProduto);
rotas.put('/produto/:id', validarProduto, validarRequisicao(produtoSchema), editarProduto);
rotas.get('/produto', listarProdutos);
rotas.delete('/produto/:id', deletarProduto);
rotas.get('/produto/:id', detalharProduto);

rotas.patch('/produto/:id/imagem',multer.single('produto_imagem' ),atualizarImagemProduto)

rotas.post('/cliente', validarRequisicao(clienteSchema), cadastrarCliente);
rotas.put('/cliente/:id', editarDadosDoCliente);
rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', detalharCliente);

rotas.post('/pedido', cadastrarPedido);
rotas.get('/pedido', listarPedidos);


module.exports = rotas;