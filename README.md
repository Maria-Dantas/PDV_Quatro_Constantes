# PDV_Quatro_Constantes
||
|:-:|
|![logo4const](https://github.com/Maria-Dantas/PDV_Quatro_Constantes/assets/64916818/8fe366c6-48b5-476b-a26e-c3915e0f41fe)|


O projeto  as **Quatro Constantes**,  uma API para um ponto de venda(PDV), foi desenvolvido utilizando a arquitetura REST na linguagem de programação javaScript(node.js).

A API pode ser acessada no https://ill-red-scarab-kit.cyclic.cloud/


## Instruções para utilizar o repositorio 
```bash
# 1 Clone este repositorio
  git clone <'URL do projeto'> 
# 2 Instale todas suas dependencias 
   npm install
# 3 Abra a pasta do projeto
   cd <'Path da pasta'>
# 4 Rode o projeto
   npm run dev

```
 ## Algumas funcionalidades 

  - Cadastrar usuário 
  - Editar e excluir usuário 
  - Cadastra produto com imagem
  - Editar e excluir produto
  - Cadastrar cliente
  - Editar cliente
  - Listar todos os clientes
  - Listar cliente especifico
  - Cadastrar pedido
  - Senhas criptogradas
  - Utilização de token 
  - Armazenamento em banco de dados SQL




## Exemplos de requisições 
```javascript
// Corpo da requisição para cadastro de usuário (body)
post/usuario
{
    "nome": "Marcela Amorim",
    "email": "marcelaamor@email.com",
    "senha": "senha"
}
```

```javascript
// Corpo da requisição para cadastro de Produto  (Multiparty)
post/produto

    descricao: Manga,
    quantidade_estoque: 20
    valor: 300
    categoria_id: 4
    produto_imagem: manga.jpg

```
## Endpoints do projeto

|**Rotas**|**Descrição**|
|-----|---------|
|`GET /categoria`|Lista todas as categorias|
|`POST /usuario`|cadastra um novo usuário|
|`POST /login`|usuário cadastrado faz login e recebe um token para autenticação|
|`GET /usuario`|Exibe o perfil do usuário|
|`PUT /usuario`|Permite ao usuário logado editar seu perfil|
|`POST /produto`|Cadastra um novo produto|
|`PUT /produto/:id`|Permite ao usuário logado editar informações de um| produto.
|`GET /produto`|Lista todos os produtos ou mostra cada categoria|
|`GET /produto/:id`| Exibe detalhes de um produto|
|`DELETE /produto/:id`| Exclui um produto|
|`POST /cliente`| Cadastra um novo cliente|
|`PUT /cliente/:id`| Permite ao usuário  editar informações de um cliente|
|`GET /cliente`| Lista os clientes|
|`GET /cliente/:id`| Exibe detalhes de um cliente|
|`POST /pedido`| Cadastra um novo pedido, incluindo produtos vinculados|
|`GET /pedido`| Lista detalhes de um pedido|
|`PATCH/produtos/:id/imagem`| Permite atualizar a imagem de um produto| 










`


 


