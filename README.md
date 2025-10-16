# SalesDuo — ASIN Optimizer

Production-grade full-stack app that fetches Amazon product details by ASIN,
optimizes listing content with an AI model, stores original + optimized results,
and shows side-by-side comparisons and history.

## Tech stack
- Backend: Node.js, TypeScript, Express, Prisma (MySQL)
- Frontend: React, TypeScript, Vite
- AI: OpenAI (example) — pluggable to Gemini
- Optional product API: Rainforest / Keepa / Amazon PA-API (recommended)
- Dev infra: Docker Compose

## Quickstart (Docker Compose)
1. Copy `.env` files: `backend/.env.example -> backend/.env`, `frontend/.env.example -> frontend/.env`
2. Fill in keys (OPENAI_API_KEY, RAINFOREST_API_KEY optional).
3. Run:
```bash
docker-compose up --build
