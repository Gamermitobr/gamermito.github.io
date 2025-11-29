import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

/**
 * Criar pagamento PIX usando Mercado Pago
 * Documentação (exemplo): Mercado Pago API retorna point_of_interaction.transaction_data.qr_code e qr_code_base64
 * NOTE: se sua integraçāo exigir campos distintos, adapte conforme doc oficial do provedor.
 */
async function createPixWithMercadoPago({ amount, description, payer }) {
  const url = 'https://api.mercadopago.com/v1/payments';
  const body = {
    transaction_amount: Number(amount),
    description: description || 'Compra via PIX',
    payment_method_id: 'pix',
    payer: payer || { email: 'customer@example.com' },
    // opcional: external_reference, metadata, etc.
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`MP API error: ${res.status} ${txt}`);
  }

  const data = await res.json();
  // Estrutura esperada (pode variar de acordo com versão da API):
  // data.point_of_interaction.transaction_data.qr_code
  // data.point_of_interaction.transaction_data.qr_code_base64
  const tx = data.point_of_interaction?.transaction_data || {};
  return {
    qr: tx.qr_code,
    qr_base64: tx.qr_code_base64,
    raw: data
  };
}

/**
 * Gera um payload PIX de teste (mock) e o QR code (dataURL)
 * Para testes offline. Não é um payload oficial para cobrança real.
 */
async function createMockPix({ amount, description }) {
  // Geramos um payload simples e humano — para ambiente de teste.
  // Em produção você usará o payload retornado pelo provedor (MercadoPago/Gerencianet/Stripe).
  const txid = uuidv4();
  const payload = `PIX|merchant:pix-shop-demo|txid:${txid}|amount:${amount}|desc:${description || 'Compra'}|key:00000000-0000-0000-0000-000000000000`;
  // Gerar QR code em base64 para colocar na página
  const qrDataUrl = await QRCode.toDataURL(payload);
  return {
    payload,
    qr_base64: qrDataUrl,
    txid
  };
}

/**
 * Endpoint: criar pagamento PIX
 * Body: { amount: number, description: string, payer: { email } }
 * Retorna: { success, provider: 'mock'|'mercadopago', qr_base64, payload, txid, expires_at? }
 */
app.post('/create-payment', async (req, res) => {
  try {
    const { amount = 1.0, description = 'Compra PIX', payer } = req.body || {};
    if (amount <= 0) return res.status(400).json({ error: 'amount must be > 0' });

    if (MP_ACCESS_TOKEN) {
      // Tenta criar via Mercado Pago
      try {
        const mp = await createPixWithMercadoPago({ amount, description, payer });
        // Mercado Pago já fornece a imagem em base64 (sem dataURL prefix) em qr_code_base64 frequentemente.
        // Se vier sem data url, criamos data url
        let qrDataUrl = mp.qr_base64;
        if (qrDataUrl && !qrDataUrl.startsWith('data:')) {
          qrDataUrl = `data:image/png;base64,${qrDataUrl}`;
        }
        return res.json({
          success: true,
          provider: 'mercadopago',
          qr_base64: qrDataUrl || null,
          payload: mp.qr || null,
          raw: mp.raw || null
        });
      } catch (e) {
        console.error('Erro MercadoPago:', e.message);
        // cair para modo mock em caso de erro
      }
    }

    // Modo mock
    const mock = await createMockPix({ amount, description });
    return res.json({
      success: true,
      provider: 'mock',
      qr_base64: mock.qr_base64,
      payload: mock.payload,
      txid: mock.txid,
      expires_at: null
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error', details: err.message });
  }
});

app.listen(PORT, () => console.log(`PIX-shop backend rodando em http://localhost:${PORT}`));
  
