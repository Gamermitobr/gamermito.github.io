# PIX Shop — Página de vendas com PIX (demo)

Este repositório contém um backend Node.js (Express) e uma página frontend simples que gera um pagamento PIX e mostra o QR code.

- Modo **mock** (padrão): gera um payload PIX falso e QR code para testes.
- Modo **produçāo**: se você configurar `MP_ACCESS_TOKEN` (Mercado Pago) no backend, o servidor tentará criar um pagamento PIX real via Mercado Pago e retornará o QR.

## Como rodar localmente

1. Clone o repositório
2. Vá para a pasta `backend`:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # opcional: coloque MP_ACCESS_TOKEN no .env
   npm start
   
