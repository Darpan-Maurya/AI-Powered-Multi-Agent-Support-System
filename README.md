# 🤖 AI-Powered Multi-Agent Support System

An intelligent customer support system built with a multi-agent architecture, where a router agent classifies user intent and delegates requests to specialized agents (Support, Order, Billing). The system maintains conversational context, supports streaming responses, and persists conversations using PostgreSQL.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org)

---

## ✨ Features

- **Multi-Agent AI System** – Intelligent routing to specialized agents
- **Domain-Specific Tools** – Each agent has restricted, purpose-built tools
- **Context Management** – Automatic conversation context compaction
- **Streaming Responses** – Real-time AI responses with typing indicators
- **RESTful Architecture** – Clean Controller–Service separation
- **Type-Safe APIs** – End-to-end type safety with Hono RPC
- **PostgreSQL Persistence** – Reliable data storage with Prisma ORM
- **Monorepo Structure** – Organized with Turborepo
- **Modern Frontend** – React + Vite for optimal performance

---

## 🛠 Tech Stack

### Backend
- **[Hono.dev](https://hono.dev)** – Ultrafast web framework
- **[Prisma ORM](https://www.prisma.io)** – Type-safe database client
- **PostgreSQL** – Robust relational database
- **[Vercel AI SDK](https://sdk.vercel.ai)** – AI/LLM integration toolkit
- **[Ollama](https://ollama.ai)** – Local LLM inference engine

### Frontend
- **[React](https://react.dev)** – UI library
- **[Vite](https://vitejs.dev)** – Next-generation frontend tooling

### Monorepo
- **[Turborepo](https://turbo.build)** – High-performance build system
- **Hono RPC** – Shared type definitions across services

---

## 📂 Project Structure
```
.
├── apps/
│   ├── api/              # Hono backend server
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── routes/
│   │   └── package.json
│   └── web/              # React + Vite frontend
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   └── App.tsx
│       └── package.json
├── packages/
│   ├── db/               # Prisma schema & migrations
│   │   ├── prisma/
│   │   └── src/
│   ├── agents/           # Router + specialized agents
│   │   └── src/
│   ├── tools/            # Database-backed agent tools
│   │   └── src/
│   └── rpc/              # Shared API types
│       └── src/
├── .env
├── package.json
├── turbo.json
└── README.md
```

---

## 🚀 Getting Started



### 1️⃣ Clone the Repository

### 2️⃣ Environment Setup

Create a `.env` file in the project root:
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/support_db

# API
PORT=3000
NODE_ENV=development

# Ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

### 3️⃣ Database Setup

Create the PostgreSQL database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE support_db;

# Exit psql
\q
```

### 4️⃣ Install Dependencies
```bash
npm install
```

### 5️⃣ Initialize Database
```bash
# Navigate to database package
cd packages/db

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx prisma db seed

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 6️⃣ Start Ollama

In a separate terminal, pull the model and start Ollama:
```bash
# Pull the LLM model
ollama pull llama3

# Start Ollama server
ollama serve
```

> **Note:** Keep this terminal running while using the application.

### 7️⃣ Start Development Servers

#### Option A: Start All Services (Recommended)

From the project root:
```bash
npm run dev
```

This starts both backend and frontend concurrently.

#### Option B: Start Services Individually

**Backend:**
```bash
cd apps/api
npm run dev
```
Backend will be available at `http://localhost:3000`

**Frontend:**
```bash
cd apps/web
npm run dev
```
Frontend will be available at `http://localhost:5173`

### 8️⃣ Verify Installation

Test the backend API:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-20T12:00:00.000Z"
}
```

---

## 📖 Usage

### Creating a Conversation

Visit `http://localhost:5173` and start chatting! The system will automatically:

1. Route your message to the appropriate agent (Support, Order, or Billing)
2. Execute relevant tools to fetch data
3. Maintain conversation context
4. Stream responses in real-time

### Example Queries

- **Support:** "My account login isn't working"
- **Orders:** "Where is order #12345?"
- **Billing:** "Why was I charged twice this month?"

---

## 🧪 Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 🏗 Architecture Overview

### System Architecture Diagram
```
┌────────────────────────────── USER (Web UI) ───────────────────────────────┐
│ React + Vite                                                                │
│ Streaming UI + Typing Indicator                                             │
└───────────────────────────────────┬────────────────────────────────────────┘
                                    │ Hono RPC (Typed)
                                    ▼
┌────────────────────────────── API LAYER (Hono) ─────────────────────────────┐
│ Controllers                                                                 │
│  • POST /chat/messages   (streaming)                                        │
│  • GET  /conversations                                                      │
│  • DELETE /conversations/:id                                                │
│                                                                            │
│ Middleware                                                                  │
│  • Error Handling                                                           │
│  • Rate Limiting                                                            │
└───────────────────────────────────┬────────────────────────────────────────┘
                                    ▼
┌──────────────────────────── SERVICE LAYER ──────────────────────────────────┐
│ Chat Service                                                                │
│  • Fetch conversation context                                               │
│  • Context compaction (token limits)                                        │
│  • Agent orchestration                                                      │
│  • Message persistence                                                      │
└───────────────────────────────────┬────────────────────────────────────────┘
                                    ▼
┌──────────────────────────── AGENT LAYER ────────────────────────────────────┐
│ Router Agent (Parent)                                                       │
│  • Intent classification                                                    │
│  • Delegation + fallback                                                    │
│                                                                            │
│ Sub-Agents                                                                  │
│  • Support Agent → FAQs, troubleshooting                                    │
│  • Order Agent   → Orders, tracking, cancellation                            │
│  • Billing Agent → Payments, refunds, invoices                               │
└───────────────────────────────────┬────────────────────────────────────────┘
                                    ▼
┌──────────────────────────── TOOL LAYER ─────────────────────────────────────┐
│ Restricted Agent Tools                                                      │
│  • Support Tools → Conversation history                                     │
│  • Order Tools   → Order & delivery lookup                                  │
│  • Billing Tools → Payment & invoice lookup                                 │
└───────────────────────────────────┬────────────────────────────────────────┘
                                    ▼
┌──────────────────────────── DATA LAYER ─────────────────────────────────────┐
│ PostgreSQL + Prisma / Drizzle                                               │
│                                                                            │
│ Tables                                                                      │
│  • Conversations                                                            │
│  • Messages                                                                 │
│  • Orders                                                                   │
│  • Payments                                                                 │
│                                                                            │
│ Seeded Mock Data                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Multi-Agent System
```
User Query
    ↓
Router Agent (Classifies Intent)
    ↓
    ├─→ Support Agent (Account issues, bugs)
    ├─→ Order Agent (Tracking, returns)
    └─→ Billing Agent (Payments, invoices)
```








## 📧 Contact

Name - Darpan Maurya- darpanmaurya2003@gmail.com


---
