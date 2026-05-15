# Devclub - Cadastro de Usuários

Interface web para cadastro, listagem e exclusão de usuários, desenvolvida com React e Vite.

## Tecnologias

- React
- Vite
- Axios

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/devclub-cadastro-de-usuarios.git

# Entre na pasta
cd devclub-cadastro-de-usuarios

# Instale as dependências
npm install
```

## Configuração

Certifique-se de que o backend está rodando em `http://localhost:3000`.

O arquivo `src/services/api.js` já está configurado com a baseURL correta:

```js
const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

## Rodando o projeto

```bash
npm run dev
```

O projeto vai rodar em `http://localhost:5173`.

## Funcionalidades

- Listar usuários cadastrados
- Cadastrar novo usuário (nome, idade e email)
- Excluir usuário

## Observação

O backend precisa estar rodando para o frontend funcionar. Veja o repositório da API para instruções.
