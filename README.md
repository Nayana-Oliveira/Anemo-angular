# Anêmo E-commerce (Angular)

Anêmo é um projeto de aplicação web de e-commerce front-end para uma loja de plantas e artigos de jardinagem. A aplicação é construída com **Angular** e utiliza `json-server` para simular um back-end RESTful para gerenciamento de produtos, usuários e categorias.

O projeto inclui funcionalidades separadas para clientes (navegação, carrinho de compras, dashboard do usuário) e administradores (gerenciamento de produtos, categorias e visualização de dados).

## Funcionalidades Principais

### Para Clientes

  * **Navegação de Produtos:** Visualização de produtos na página inicial (`home.html`) e por categorias (`category.html`).
  * **Busca de Produtos:** Barra de pesquisa no cabeçalho (`header.ts`) que leva a uma página de resultados (`search-results.html`).
  * **Detalhes do Produto:** Página dedicada para cada produto com descrição, galeria de imagens e opção de adicionar ao carrinho (`product-detail.html`).
  * **Carrinho de Compras:** Gerenciamento completo do carrinho (`cart.service.ts`, `cart.html`), permitindo adicionar, remover e alterar a quantidade de itens.
  * **Autenticação de Usuário:**
      * Login de usuário (`login-user.html`).
      * Cadastro de novo usuário (`register-user.html`).
  * **Painel do Usuário:**
      * Visualização de dados da conta (`user-dashboard.html`).
      * Edição de dados pessoais (nome, CPF, telefone, etc.) (`user-dashboard.ts`).
      * Gerenciamento de endereços (Adicionar, Editar e Excluir) (`user-dashboard.ts`).

### Para Administradores

  * **Autenticação de Administrador:**
      * Login de administrador (`login-admin.html`).
      * Cadastro de novo administrador (`register-admin.html`).
  * **Painel de Administrador (`admin-dashboard.html`):**
      * **Gerenciamento de Produtos (CRUD):**
          * Listar todos os produtos em uma tabela.
          * Cadastrar novos produtos (`product-registration.html`).
          * Editar produtos existentes (`edit-product.html`).
          * Excluir produtos (`admin-dashboard.ts`).
      * **Gerenciamento de Categorias (CRUD):**
          * Listar, adicionar, editar e excluir categorias (`admin-dashboard.html`).
      * **Gerenciamento de Endereços:** Administradores também podem gerenciar seus próprios endereços.

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias (com base no `package.json`):

  * **Front-end:**
      * **Angular (v20.3.x)**
      * **TypeScript**
      * **ngx-toastr:** Para notificações e alertas.
      * **@fortawesome/angular-fontawesome:** Para ícones (ex: busca).
  * **Back-end (Mock):**
      * **json-server:** Para criar uma API RESTful falsa baseada no arquivo `db.json`.
  * **Testes:**
      * **Karma**
      * **Jasmine**

## Como Executar o Projeto

Para rodar este projeto localmente, você precisará de dois terminais: um para o back-end (API) e outro para o front-end (Angular).

### Pré-requisitos

  * [Node.js](https://nodejs.org/) (v18 ou superior)
  * [Angular CLI](https://angular.dev/tools/cli) (v20.x)

-----

### 1\. Instalação

Clone o repositório e instale as dependências do npm:

```bash
# Clone o repositório (exemplo)
git clone https://github.com/nayana-oliveira/anemo-angular.git

# Navegue até a pasta do projeto
cd anemo-angular

# Instale as dependências
npm install
```

-----

### 2\. Executando o Back-end (API Mock)

Inicie o `json-server` para fornecer os dados do arquivo `db.json`. A API rodará em `http://localhost:5010`.

```bash
npm run api
```

*(Este comando executa `json-server --watch db.json --port 5010`)*

-----

### 3\. Executando o Front-end (Aplicação Angular)

Em um **novo terminal**, inicie o servidor de desenvolvimento do Angular. A aplicação estará disponível em `http://localhost:4200/`.

```bash
npm start
```

*(Este comando executa `ng serve`)*

-----

### 4\. Acesso

  * **Aplicação:** Abra seu navegador em `http://localhost:4200/`
  * **API:** Você pode ver os dados brutos da API em `http://localhost:5010/products`

## Estrutura dos Arquivos

```
/
├── public/
│   ├── assets/
│   │   ├── assets/  (Ícones, logos, etc.)
│   │   └── products/ (Imagens dos produtos)
├── src/
│   ├── app/
│   │   ├── components/ (Header, Footer)
│   │   ├── models/     (Interfaces Product, Category)
│   │   ├── pages/      (Todos os componentes de página, ex: Home, Cart, Login, Admin)
│   │   ├── services/   (AuthService, CartService, ProductService, CategoryService)
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── environments/
│   │   └── environment.ts (Configuração da URL da API)
│   ├── index.html
│   └── styles.css
├── angular.json        (Configuração do Angular CLI)
├── db.json             (Banco de dados mock para json-server)
├── package.json        (Dependências e scripts)
└── tsconfig.json       (Configuração do TypeScript)
```

## Scripts Disponíveis

  * `npm start`: Inicia o servidor de desenvolvimento do Angular (`ng serve`).
  * `npm run api`: Inicia o back-end `json-server` na porta 5010.
  * `npm run build`: Compila o projeto para produção.
  * `npm test`: Executa os testes unitários com Karma.