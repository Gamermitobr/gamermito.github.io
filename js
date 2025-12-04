// api/create-order.js (Node / Vercel)
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { insertOrder } = require('./db'); // sua função DB

module.exports = async (req, res) => {
  const { serviceId, target, quantity } = req.body;
  // validações...
  const price = getPriceFor(serviceId) * quantity;
  const order = await insertOrder({ serviceId, target, quantity, price, status:'pending' });

  // criar checkout (Stripe Checkout Session exemplo)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency:'brl', product_data:{name:'Pedido SMM'}, unit_amount: Math.round(price*100) }, quantity:1 }],
    mode: 'payment',
    success_url: `${process.env.SITE_URL}/success?order=${order.id}`,
    cancel_url: `${process.env.SITE_URL}/cancel?order=${order.id}`,
  });

  res.json({ checkoutUrl: session.url });
};
