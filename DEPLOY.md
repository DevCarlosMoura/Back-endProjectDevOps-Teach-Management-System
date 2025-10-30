# Guia de Deploy

## Configuração de Secrets no GitHub

Para que o pipeline de CI/CD funcione corretamente, você precisa configurar os seguintes secrets no seu repositório:

1. Acesse o repositório no GitHub
2. Vá em **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:
   - `DOCKER_USERNAME`: Seu nome de usuário do Docker Hub
   - `DOCKER_PASSWORD`: Sua senha ou token de acesso do Docker Hub

## Deploy em Servidor

### Opção 1: Deploy com Docker Compose

1. Clone o repositório no servidor:
```bash
git clone <url-do-repositorio>
cd teacher-management-system
```

2. Configure as variáveis de ambiente:
```bash
# Backend
cp backend/.env.example backend/.env
# Edite backend/.env com suas configurações

# Frontend
echo "VITE_API_URL=http://seu-dominio.com/api" > frontend/.env
```

3. Inicie os containers:
```bash
docker-compose up -d
```

### Opção 2: Deploy Manual

#### Backend

1. Instale as dependências:
```bash
cd backend
npm install
```

2. Configure o banco de dados PostgreSQL

3. Configure as variáveis de ambiente no arquivo `.env`

4. Compile e inicie:
```bash
npm run build
npm start
```

#### Frontend

1. Instale as dependências:
```bash
cd frontend
npm install
```

2. Configure a variável de ambiente:
```bash
echo "VITE_API_URL=http://seu-backend-url/api" > .env
```

3. Build:
```bash
npm run build
```

4. Sirva os arquivos estáticos da pasta `dist` com nginx ou outro servidor web

## Configuração de Domínio

Para configurar um domínio personalizado:

1. Configure seu DNS para apontar para o IP do servidor
2. Configure um reverse proxy (nginx) para rotear as requisições
3. Configure SSL/TLS com Let's Encrypt

## Monitoramento

- Logs do backend: `docker logs teacher-management-backend`
- Logs do frontend: `docker logs teacher-management-frontend`
- Logs do banco: `docker logs teacher-management-db`
