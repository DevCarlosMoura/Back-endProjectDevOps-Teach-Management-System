# Guia Rápido de Início

## Pré-requisitos

Certifique-se de ter instalado:

- **Docker Desktop** (Windows/Mac) ou **Docker Engine** (Linux)
- **Docker Compose** (geralmente incluído no Docker Desktop)

## Passos para Executar

### 1. Descompactar o Projeto

```bash
# Windows (PowerShell)
tar -xzf teacher-management-system-fixed.tar.gz
cd teacher-management-system

# Linux/Mac
tar -xzf teacher-management-system-fixed.tar.gz
cd teacher-management-system
```

### 2. Executar com Docker

```bash
docker-compose up --build
```

**Aguarde:** O processo pode levar alguns minutos na primeira vez.

### 3. Acessar a Aplicação

Quando você ver a mensagem "Server is running on port 3000", acesse:

- **Frontend:** http://localhost:80
- **API Backend:** http://localhost:3000
- **Swagger (Documentação):** http://localhost:3000/api-docs

## Primeiro Uso

### 1. Criar uma Conta

1. Acesse http://localhost:80
2. Clique em "Registre-se"
3. Preencha: Nome, Email e Senha
4. Clique em "Registrar"

### 2. Fazer Login

1. Volte para a página de login
2. Use o email e senha cadastrados
3. Clique em "Entrar"

### 3. Gerenciar Professores

Após o login, você será redirecionado para a página de gerenciamento onde pode:

- **Criar** novo professor (botão "Novo Professor")
- **Listar** todos os professores cadastrados
- **Editar** informações de um professor
- **Deletar** um professor

## Testar a API com Swagger

1. Acesse http://localhost:3000/api-docs
2. Primeiro, use o endpoint **POST /api/auth/register** para criar um usuário
3. Use **POST /api/auth/login** para obter o token JWT
4. Copie o token retornado
5. Clique no botão **"Authorize"** no topo da página
6. Cole o token no formato: `Bearer seu-token-aqui`
7. Clique em **"Authorize"**
8. Agora você pode testar todos os endpoints!

## Parar a Aplicação

```bash
# Parar containers (mantém dados)
docker-compose down

# Parar e remover volumes (apaga dados)
docker-compose down -v
```

## Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Ver logs apenas do backend
docker-compose logs -f backend

# Reiniciar apenas um serviço
docker-compose restart backend

# Verificar status dos containers
docker-compose ps
```

## Problemas?

Consulte o arquivo `TROUBLESHOOTING.md` para soluções de problemas comuns.

## Estrutura de Dados

### Professor (Teacher)

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "(11) 98765-4321",
  "specialization": "Matemática",
  "bio": "Professor com 10 anos de experiência"
}
```

### Disciplina (Subject)

```json
{
  "name": "Cálculo I",
  "code": "MAT101",
  "description": "Introdução ao Cálculo Diferencial",
  "workload": 80
}
```

### Horário (Schedule)

```json
{
  "teacherId": "uuid-do-professor",
  "subjectId": "uuid-da-disciplina",
  "dayOfWeek": "Segunda-feira",
  "startTime": "08:00",
  "endTime": "10:00",
  "classroom": "Sala 101"
}
```

## Próximos Passos

- Explore os endpoints de **Disciplinas** (`/api/subjects`)
- Explore os endpoints de **Horários** (`/api/schedules`)
- Vincule professores a disciplinas através dos horários
- Personalize o frontend conforme suas necessidades

## Suporte

Para mais informações, consulte:

- `README.md` - Documentação completa
- `PROJECT_SUMMARY.md` - Resumo técnico do projeto
- `DEPLOY.md` - Guia de deploy em produção
- `TROUBLESHOOTING.md` - Solução de problemas
