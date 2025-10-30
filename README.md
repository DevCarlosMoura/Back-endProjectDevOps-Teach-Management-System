# Sistema de Gerenciamento de Professores

## Descrição do Projeto

Este é um sistema completo para cadastro e gerenciamento de professores, permitindo a vinculação de docentes a disciplinas e horários. O projeto foi desenvolvido como uma aplicação full-stack, com um backend robusto e um frontend reativo para uma experiência de usuário fluida.

### Proposta do Sistema

A plataforma visa simplificar a administração de informações acadêmicas, oferecendo as seguintes funcionalidades:

- **Autenticação de Usuários:** Sistema seguro de registro e login com tokens JWT.
- **Gerenciamento de Professores:** CRUD (Criar, Ler, Atualizar, Deletar) completo para o cadastro de professores.
- **Gerenciamento de Disciplinas:** CRUD para o cadastro de disciplinas.
- **Gerenciamento de Horários:** Funcionalidade para vincular professores a disciplinas em horários específicos.

## Tecnologias Utilizadas

| Categoria | Tecnologia | Descrição |
|---|---|---|
| **Backend** | Node.js, Express, TypeScript | Plataforma e framework para a construção da API REST. |
| **Frontend** | React, TypeScript, Vite | Biblioteca para a construção da interface de usuário com tipagem estática e build rápido. |
| **Banco de Dados** | PostgreSQL | Banco de dados relacional para armazenamento dos dados. |
| **ORM** | TypeORM | Mapeamento objeto-relacional para facilitar a interação com o banco de dados. |
| **Autenticação** | JWT (JSON Web Tokens) | Padrão para criação de tokens de acesso que validam as requisições. |
| **Documentação da API** | Swagger | Ferramenta para documentar e testar os endpoints da API de forma interativa. |
| **Containerização** | Docker, Docker Compose | Criação de ambientes isolados para a aplicação e o banco de dados, facilitando a execução. |
| **CI/CD** | GitHub Actions | Automação do processo de build, teste e deploy da aplicação. |

## Acesso ao Projeto

- **URL do Site:** `http://<seu-dominio-ou-ip>`
- **URL da API:** `http://<seu-dominio-ou-ip>/api`
- **Documentação Swagger:** `http://localhost:3000/api-docs` (acessível localmente após iniciar o backend)

## Instruções para Execução Local

Para executar o projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Passos para Instalação

1.  **Clone o repositório:**

    ```bash
    git clone <url-do-seu-repositorio-privado>
    cd teacher-management-system
    ```

2.  **Variáveis de Ambiente:**

    - No diretório `backend`, renomeie o arquivo `.env.example` para `.env` e, se necessário, ajuste as variáveis de ambiente, como a `JWT_SECRET`.
    - No diretório `frontend`, crie um arquivo `.env` e adicione a variável `VITE_API_URL=http://localhost:3000/api`.

3.  **Inicie os containers com Docker Compose:**

    A partir da raiz do projeto, execute o comando:

    ```bash
    docker-compose up --build
    ```

4.  **Acesse a aplicação:**

    - O **frontend** estará disponível em `http://localhost:80`.
    - O **backend** estará rodando na porta `3000`.
    - A **documentação da API (Swagger)** pode ser acessada em `http://localhost:3000/api-docs`.

## Pipeline de CI/CD

O projeto está configurado com um pipeline de Continuous Integration e Continuous Deployment (CI/CD) utilizando **GitHub Actions**.

- **On Push/Pull Request (main):** A cada `push` ou `pull request` para a branch `main`, o workflow `build-and-test` é acionado para instalar as dependências e construir os projetos de backend e frontend, garantindo a integridade do código.
- **On Merge (main):** Após o merge para a `main`, o job `deploy` é executado. Ele faz o login no Docker Hub, constrói as imagens Docker do backend e do frontend e as envia para o registro. Para que a automação funcione, é necessário configurar os seguintes secrets no repositório do GitHub:
    - `DOCKER_USERNAME`: Seu nome de usuário do Docker Hub.
    - `DOCKER_PASSWORD`: Sua senha ou token de acesso do Docker Hub.

## Apresentação

Durante a apresentação, o **Swagger** estará acessível para demonstrar e testar todos os endpoints da API de forma clara e interativa, mostrando o funcionamento de cada rota do CRUD e da autenticação.
