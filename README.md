# 🚗 **Fleet Control API**

API REST para controle de frota, desenvolvida com **Node.js**, **Express**, **PostgreSQL** e **Prisma ORM**.

Permite gerenciar automóveis, motoristas e registros de utilização, garantindo regras de negócio como:

* Um carro só pode ser usado por um motorista por vez.
* Um motorista não pode conduzir mais de um carro simultaneamente.

---

## 📘 **Índice**

1. [Tecnologias](#-tecnologias)
2. [Funcionalidades](#-funcionalidades)
3. [Arquitetura do Projeto](#-arquitetura-do-projeto)
4. [Pré-requisitos](#-pré-requisitos)
5. [Instalação e Execução](#%EF%B8%8F-instalação-e-execução)

   * [Rodar localmente](#rodando-localmente)
   * [Rodar com Docker](#rodando-com-docker)
6. [Migrations (Prisma)](#%EF%B8%8F-prisma-migrations)
7. [Documentação Swagger](#-documentação-swagger)
8. [Rotas da API](#-rotas-da-api)
9. [Regras de Negócio](#-regras-de-negócio)
10. [Variáveis de Ambiente](#-variáveis-de-ambiente)
11. [Scripts úteis](#-scripts-úteis)
12. [Contribuição](#-contribuição)

---

## 🚀 **Tecnologias**

* **Node.js 20**
* **Express 5**
* **TypeScript**
* **PostgreSQL 16**
* **Prisma ORM**
* **Zod** (validação)
* **Docker + Docker Compose**
* **Swagger (OpenAPI 3)** para documentação

---

## 🧩 **Funcionalidades**

### ✔ Automóveis

* Criar, listar, filtrar, atualizar e remover
* Filtros: `?color=...`, `?brand=...`

### ✔ Motoristas

* Criar, listar, filtrar, atualizar e remover
* Filtro: `?name=...` (case-insensitive)

### ✔ Utilizações

* Iniciar uso de um automóvel
* Finalizar uso
* Listar com agregações (carro + motorista)

### ✔ Regras obrigatórias

* Um carro não pode estar em uso duas vezes ao mesmo tempo.
* Um motorista não pode usar dois carros simultaneamente.

---

## 🏗 **Arquitetura do Projeto**

```
src/
├─ index.ts         → Server
├─ app.ts           → App + middlewares
├─ routes/          → Rotas Express
├─ controllers/     → Regras HTTP
├─ services/        → Regras de negócio
├─ validations/     → Esquemas Zod
├─ middlewares/     → Validations + errors
├─ config/          → Swagger + DB
├─ utils/           → Helpers
prisma/
└─ schema.prisma    → Modelos do banco
```

---

## 🧰 **Pré-requisitos**

* **Node.js 18+**
* **Docker + Docker Compose** (para rodar com containers)
* **PostgreSQL** (apenas se rodar sem Docker, pode rodar somente o banco pelo docker compose se preferir)

---

# 🏃‍♂️⚙️ **Instalação e Execução**

---
## ▶ **Rodando em 2 palito**

```bash
# palito 1 :)
git clone https://github.com/seu-repo/fleet-control.git
# palito 2 :)
cd fleet-control && npm run deploy:local
```

## ▶ **Rodando localmente**

### 1. Clone o repositório

```bash
git clone https://github.com/seu-repo/fleet-control.git
cd fleet-control
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o `.env`

Crie o arquivo:

```bash
cp .env.example .env
```

Conteúdo esperado:

```
DATABASE_URL="postgresql://user:password@localhost:5432/fleetcontrol?schema=public"
PORT=3333
```

### 4. Gere o client do Prisma

```bash
npm run prisma:generate
```

### 5. Execute as migrations

```bash
npm run prisma:migrate
```

### 6. Inicie a API em modo desenvolvimento

```bash
npm run dev
```

Servidor rodando em:

👉 **[http://localhost:3333](http://localhost:3333)**

---

## 🐳 **Rodando com Docker**

### 1. Suba tudo via docker-compose

```bash
npm run deploy:local
```

Isso irá:

* Criar container do **PostgreSQL**
* Criar container da **API**
* Executar npm build/start

A aplicação ficará acessível em:

👉 **[http://localhost:3000](http://localhost:3000)**

---

# 🛠️ **Prisma Migrations**

Sempre que editar `schema.prisma`, execute:

```bash
npm run prisma:migrate
```

Para gerar o client:

```bash
npm run prisma:generate
```

---

# 📚 **Documentação Swagger**

A API possui documentação visual via Swagger:

👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

Ali você pode testar todas as rotas (GET, POST, PUT, DELETE).

---

# 📡 **Rotas da API**

---

## 🚘 **Cars**

### **POST /cars**

Criar carro

```json
{
  "plate": "ABC1234",
  "color": "red",
  "brand": "Toyota"
}
```

### **GET /cars**

Listar carros (com filtros)

`/cars?color=red&brand=Toyota`

### **GET /cars/:id**

### **PUT /cars/:id**

### **DELETE /cars/:id**

---

## 🧑‍✈️ **Drivers**

### **POST /drivers**

```json
{
  "name": "João Silva"
}
```

### **GET /drivers?name=joao**

### **GET /drivers/:id**

### **PUT /drivers/:id**

### **DELETE /drivers/:id**

---

## 🔄 **Usages**

### **POST /usages**

Inicia o uso de um veículo

```json
{
  "carId": 1,
  "driverId": 3,
  "reason": "Entrega de materiais"
}
```

### **POST /usages/:id/end**

Finaliza o uso:

```json
{
  "endAt": "2025-01-01T10:00:00.000Z"
}
```

### **GET /usages**

Lista usos com carro + motorista

---

# 🧠 **Regras de negócio**

* ❌ Um carro já em uso **não pode ser reutilizado**
* ❌ Um motorista usando um carro **não pode iniciar outro uso**
* ✔ A validação ocorre dentro de uma **transação Prisma**
* ✔ O uso só é finalizado se `endAt` for null

---

# 🔧 **Variáveis de Ambiente**

| Variável       | Descrição                                           |
| -------------- | --------------------------------------------------- |
| `DATABASE_URL` | URL de conexão do PostgreSQL                        |
| `PORT`         | Porta do servidor (default: 3333) |

---

# 📦 **Scripts úteis**

| Script                    | Função                         |
| ------------------------- | ------------------------------ |
| `npm run dev`             | Rodar servidor com ts-node-dev |
| `npm run build`           | Compilar para JS em `dist/`    |
| `npm start`               | Rodar versão compilada         |
| `npm run prisma:migrate`  | Executa migrations             |
| `npm run prisma:generate` | Gera client do Prisma          |
| `npm run deploy:local`    | Sobe tudo com Docker           |

---
