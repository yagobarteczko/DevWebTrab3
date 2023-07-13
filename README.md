# dw_trabalho_03

Desenvolvimento Web - Trabalho 03 - React
### Aluno: 
  Yago Gabriel Barteczko 18008526

 
## Framework para a criação da API REST

  - SpringBoot
 
## Descrição do Projeto
  Trabalho 3 de Desenvolvimento Web utilizando Spring boot, React e Javascript para a implementação de uma API REST que possibilita listar e adicionar novos produtos a um sistema de supermercado.

## Funcionalidades
 Cadastro de produtos
 
 Listagem de produtos cadastrados
 
 Remoção de produtos cadastrados
 
 Exclusão de todos os produtos
 
## Requisitos
  Banco de dados MYSQL
  
  Gerenciador de pacotes MAVEN
  
  Node.js
  
  Gerenciador de pacotes NPM
  

## Descrições da api e da interface
  Páginas do sistema:

  Tela principal: http://localhost:8080 -> Consta as opções de listagem e adicionar um novo produto. Além de uma lista com os produtos já cadastrados.

  Listagem de produtos: http://localhost:8080/list -> É aberta ao clicar no botão "Listar todos os produtos cadastrados" em uma das outras páginas.

  Inclusão de novo produto: http://localhost:8080/add -> É aberta ao clicar no botão "Adicionar" na página inicial. Abre um formulário para a inclusão de um novo produto, contendo os campos para a inclusão de seu nome e preço. Ao clicar no botão "Adicionar" os dados preenchidos são salvos no banco de dados como um novo produto;

## Métodos da API:

  /api/produtos
  
  Método POST: cria um produto;
  
  Método GET: lista todos os produtos;
  
  Método DELETE: exclui todos os produtos.
  
  /api/produtos/{id}

