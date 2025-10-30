# Guia de Solução de Problemas

## Problemas Comuns e Soluções

### 1. Erro de Build do TypeScript

**Problema:** Erro relacionado a `verbatimModuleSyntax` ou importações de tipo.

**Solução:** O projeto já está configurado corretamente. Se você modificou os arquivos de configuração, certifique-se de que:
- `frontend/tsconfig.app.json` tem `"verbatimModuleSyntax": false`
- Importações de tipos usam `type` quando necessário: `import { type Teacher } from '...'`

### 2. Erro ao Executar Docker Compose

**Problema:** Warning sobre `version` no docker-compose.yml

**Solução:** O projeto já está atualizado sem a propriedade `version` (obsoleta nas versões mais recentes do Docker Compose).

### 3. Porta Já em Uso

**Problema:** Erro indicando que a porta 3000, 5432 ou 80 já está em uso.

**Solução:**
```bash
# Parar containers em execução
docker-compose down

# Verificar portas em uso (Linux/Mac)
lsof -i :3000
lsof -i :5432
lsof -i :80

# Verificar portas em uso (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :5432
netstat -ano | findstr :80

# Alterar portas no docker-compose.yml se necessário
```

### 4. Banco de Dados Não Conecta

**Problema:** Backend não consegue conectar ao PostgreSQL.

**Solução:**
```bash
# Verificar se o container do banco está rodando
docker ps

# Ver logs do banco de dados
docker logs teacher-management-db

# Reiniciar apenas o banco
docker-compose restart db

# Aguardar o healthcheck do banco
docker-compose up db
```

### 5. Frontend Não Consegue Acessar a API

**Problema:** Erro de CORS ou requisições falhando.

**Solução:**
- Verifique se o backend está rodando: `http://localhost:3000/health`
- Verifique a variável `VITE_API_URL` no arquivo `frontend/.env`
- Se estiver usando Docker, o nginx já está configurado para fazer proxy das requisições

### 6. Erro ao Fazer Login

**Problema:** Credenciais inválidas ou erro 401.

**Solução:**
- Primeiro, registre um usuário em `/register`
- Use as mesmas credenciais para fazer login
- Verifique se o token JWT está sendo armazenado no localStorage do navegador

### 7. Limpar Tudo e Recomeçar

Se nada funcionar, execute:

```bash
# Parar e remover todos os containers
docker-compose down -v

# Remover imagens construídas
docker rmi teacher-management-backend teacher-management-frontend

# Limpar builds locais
rm -rf backend/dist frontend/dist backend/node_modules frontend/node_modules

# Reconstruir tudo
docker-compose up --build
```

## Teste Local Sem Docker

Se preferir testar sem Docker:

### Backend

```bash
cd backend
npm install
npm run build
npm start
```

O backend estará em `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará em `http://localhost:5173`

**Importante:** Neste modo, você precisa ter o PostgreSQL instalado e rodando localmente.

## Verificar Logs

```bash
# Logs do backend
docker logs teacher-management-backend

# Logs do frontend
docker logs teacher-management-frontend

# Logs do banco
docker logs teacher-management-db

# Logs em tempo real
docker-compose logs -f
```

## Testar a API com Swagger

Acesse `http://localhost:3000/api-docs` para testar todos os endpoints da API de forma interativa.

1. Primeiro, use `/api/auth/register` para criar um usuário
2. Use `/api/auth/login` para obter o token
3. Clique em "Authorize" no topo da página do Swagger
4. Cole o token no formato: `Bearer seu-token-aqui`
5. Agora você pode testar todos os endpoints protegidos

## Contato

Se o problema persistir, verifique:
- Versão do Docker: `docker --version` (recomendado: 20.10+)
- Versão do Docker Compose: `docker-compose --version` (recomendado: 2.0+)
- Versão do Node.js: `node --version` (recomendado: 22.x)
