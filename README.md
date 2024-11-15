## Descrição
Este é o frontend de uma aplicação de enquetes desenvolvida em Next.js, onde os usuários podem visualizar, criar, editar e excluir enquetes. O projeto foi criado com foco em oferecer uma interface simples, intuitiva e responsiva.

## Para executar o projeto
###  Clone
```bash
git@github.com:itMatos/frontend-SurveyPro-polls.git
```

### Instale as dependências

```bash
npm install
```

### Execute o projeto

```bash
# development
npm run dev
```

## Principais Funcionalidades
### Autenticação com Google OAuth
- Usuários podem se cadastrar e fazer login utilizando a sua conta do Google.

### Criação de Enquetes
- Os usuários podem criar enquetes com múltiplas opções de resposta.

### Edição e Exclusão
- Os usuários podem editar ou excluir enquetes.
### Votação
- Usuários podem votar nas enquetes disponíveis.

## Tecnologias Utilizadas
- #### Next.js
- #### Javascript
- #### CSS/Material UI
- #### Axios ou Fetch API
- #### Hooks API

src/
├── app/
├── services/
├── auth/
├── pages/
│   ├── home/
│   ├── polls/
│   ├── index.jsx
├── .env.local
└── package.json       


## Rotas Principais
`/` – Página de login.
`/home` – Página inicial listando as enquetes disponíveis
`/polls/` – Página para criar uma nova enquete.
`/polls/:id` – Página de detalhes e edição de enquete

## Requisições para o Backend
A comunicação com o backend é feita através do Axios, e os serviços estão centralizados na pasta `services/`, onde você pode encontrar funções como createPoll, getPolls, entre outros endpoints.

