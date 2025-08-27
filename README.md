#  Gym Platform (Monorepo)

Este projeto é uma plataforma completa para **avaliações físicas e gestão de usuários** (alunos, treinadores e administradores), construída com tecnologias modernas e organizada como um **monorepo** com `turbo` para facilitar o desenvolvimento, build e deploy.

## 📁 Estrutura do Projeto

Este monorepo é dividido em dois principais workspaces:
```
apps/
├─ backend/ ← API RESTful construída com Express, TypeORM e Swagger
└─ frontend/ ← Aplicação web com Next.js, Chakra UI e React Query
packages/
└─ shared/ ← Tipagens, validações e utilitários compartilhados
```
---

## 🚀 Tecnologias Utilizadas

### Backend (`apps/backend`)
- **Express.js** (v5)
- **TypeORM** com banco SQLite
- **Zod** para validação de entrada
- **Swagger** (via `swagger-jsdoc` e `swagger-ui-express`)
- **JWT** para autenticação
- **Vitest** para testes
- **CORS**, **Helmet** e **dotenv** para segurança e config
- **Arquitetura em módulos** (`users`, `evaluations`, `tokens`)
- **Documentação automatizada com Swagger**

### Frontend (`apps/frontend`)
- **Next.js 15**
- **React 19**
- **Chakra UI** para design system
- **React Hook Form + Zod** para formulários
- **TanStack Query (React Query)** para cache de dados
- **AuthContext** com persistência em Cookies
- **Arquitetura baseada em features e páginas**

### Shared (`packages/shared`)
- Tipagens globais (`types`)
- Validações (`zod schemas`)
- Utilitários (`utils`)

---

## 📂 Estrutura de Pastas

### Backend (`apps/backend/src`)
```
src/
├─ @types/ # Tipagens globais e interfaces
├─ config/ # Configurações de ambiente
├─ database/ # Migrations, seed e fonte de dados TypeORM
├─ modules/ # Módulos funcionais
│ ├─ evaluations/
│ ├─ tokens/
│ └─ users/
├─ shared/
│ ├─ docs/ # Documentação Swagger
│ ├─ errors/ # Classes de erro customizadas
│ ├─ middlewares/
│ └─ routes/ # Agrupamento de rotas por módulo
├─ utils/ # Helpers e funções reutilizáveis
├─ main.ts # Ponto de inicialização
└─ server.ts # Configuração do servidor
```

### Frontend (`apps/frontend/src`)
```
src/
├─ app/ # Estrutura de rotas do Next.js (App Router)
│ ├─ admin/
│ ├─ dashboard/
│ ├─ login/
│ └─ trainer/
├─ components/ # Componentes reutilizáveis
├─ const/ # Constantes globais
├─ context/ # Context API (ex: AuthContext)
├─ features/ # Feature-based design (users, evaluations)
├─ hoc/ # Higher Order Components (ex: withAuth)
├─ hooks/ # Custom hooks
├─ interface/ # Interfaces e tipagens locais
├─ providers/ # Providers globais (ex: Chakra, Auth, QueryClient)
├─ services/ # Integrações com a API
└─ utils/ # Helpers frontend
```

---

## 🧪 Pré-requisitos

- **Node.js v20+**
- **PNPM v10+**
- **SQLite3**

---

## 🛠️ Instalação e Execução

1. **Instalar dependências:**

```bash
pnpm install
pnpm dev:backend

Antes de rodar o backend, é necessário executar o seed:

pnpm --filter backend seed
Isso irá popular o banco SQLite com dados do admin.

pnpm dev:frontend

```
# Documentação da API (Swagger)

O backend expõe a documentação Swagger automaticamente.

Acesse via: http://localhost:3333/docs

Os seguintes módulos estão documentados:

/users

/auth

/evaluations

# Scripts Disponíveis
Backend

pnpm dev:backend - Inicia o backend em modo watch

pnpm seed - Executa a seed de dados

pnpm migrate:gen - Gera nova migration

pnpm migrate:run - Aplica as migrations

pnpm test - Executa os testes com Vitest

Frontend

pnpm dev:frontend - Inicia o frontend em modo dev

pnpm build - Gera build de produção


# Autenticação e Autorização

 - Login: JWT via /auth/login

  - Refresh Token: via /auth/refresh

  - Roles:

        ADMIN

        TRAINER

        STUDENT

Middleware ensureAuthenticated e ensureRole validam as permissões.



