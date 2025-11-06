# Resumo do Projeto - Sistema de Gerenciamento de Professores

## Estrutura do Projeto

```
teacher-management-system/
├── backend/                    # API REST em Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/            # Configurações (database, swagger)
│   │   ├── controllers/       # Controladores (Auth, Teacher, Subject, Schedule)
│   │   ├── entities/          # Entidades TypeORM (User, Teacher, Subject, Schedule)
│   │   ├── middlewares/       # Middleware de autenticação JWT
│   │   ├── routes/            # Rotas da API
│   │   └── index.ts           # Arquivo principal
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # Interface em React + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis (PrivateRoute)
│   │   ├── pages/             # Páginas (Login, Register, Teachers)
│   │   ├── services/          # Serviços de API (api, auth, teachers)
│   │   └── App.tsx            # Componente principal com rotas
│   ├── Dockerfile
│   ├── nginx.conf             # Configuração do nginx
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # Pipeline CI/CD
│
├── docker-compose.yml         # Orquestração dos containers
├── README.md                  # Documentação principal
└── DEPLOY.md                  # Guia de deploy

```

## Funcionalidades Implementadas

### Backend (API REST)

1. **Autenticação**
   - POST /api/auth/register - Registro de usuários
   - POST /api/auth/login - Login e geração de token JWT

2. **Professores**
   - GET /api/teachers - Listar todos os professores
   - GET /api/teachers/:id - Buscar professor por ID
   - POST /api/teachers - Criar novo professor
   - PUT /api/teachers/:id - Atualizar professor
   - DELETE /api/teachers/:id - Deletar professor


### Frontend (React)

1. **Páginas**
   - Login - Autenticação de usuários
   - Registro - Cadastro de novos usuários
   - Professores - CRUD completo de professores

2. **Recursos**
   - Rotas protegidas com autenticação
   - Integração completa com a API
   - Interface responsiva e intuitiva

## Tecnologias

- **Backend:** Node.js, Express, TypeScript, TypeORM, PostgreSQL, JWT, Swagger
- **Frontend:** React, TypeScript, Vite, Axios, React Router
- **Infraestrutura:** Docker, Docker Compose, GitHub Actions
- **Banco de Dados:** PostgreSQL

## Endpoints da API

Todos os endpoints (exceto /auth/register e /auth/login) requerem autenticação via token JWT no header:
```
Authorization: Bearer <token>
```

## Documentação Swagger

Acesse `http://localhost:3000/api-docs` para visualizar e testar a API interativamente.

## Como Executar

1. Clone o repositório
2. Execute `docker-compose up --build`
3. Acesse:
   - Frontend: http://localhost:80
   - Backend: http://localhost:3000
   - Swagger: http://localhost:3000/api-docs

