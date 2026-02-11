import pool from './database/db.js';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe'; //payment
import { syncProducts } from './database/query.js';
import {addCartProduct, allProducts,deleteProduct } from './router/router.js';



dotenv.config();



const app = express();
app.use(cors({ origin:process.env.FRONTEND_URL||'http://localhost:5173' }));   
app.use(express.json());
/* app.use(express.static('dist')); */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST); //payment





app.delete('/delete/:id',deleteProduct);

app.post('/user/add',addCartProduct);

syncProducts();                            //syncronizing data code query.js

// Home route to fetch products
app.get('/api/products',allProducts);

// Return only clothing (men's and women's) by fetching external API and filtering
app.get('/api/products/clothing', async (req, res) => {
  try {
    const response = await fetch(process.env.API_URL);
    if (!response.ok) return res.status(response.status).json({ error: 'Error fetching external API' });
    const data = await response.json();
    const cloth = data.filter(d => {
      const cat = (d.category || '').toString().toLowerCase();
      return cat.includes("men") || cat.includes("women");
    }).slice(0, 20);
    res.json(cloth);
  } catch (err) {
    console.error('Error fetching clothing products:', err.message);
    res.status(500).json({ error: 'Error fetching clothing products' });
  }
});

// Proxy to external API - return all external products (used to include categories not in local DB)
app.get('/api/products/external', async (req, res) => {
  try {
    const response = await fetch(process.env.API_URL);
    if (!response.ok) return res.status(response.status).json({ error: 'Error fetching external API' });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching external products:', err.message);
    res.status(500).json({ error: 'Error fetching external products' });
  }
});







//Show Image
app.get('/api/products/:id',(req,res)=>{
  const {id} = req.params;
  const url = `${process.env.API_URL}/${id}`;
  fetch(url)
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(err =>res.status(500).json({error: err.message}));
});





//Payment Metod
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, name, email, address } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      receipt_email: email,
      metadata: {
        customer_name: name || '',
        customer_email: email || '',
      },
      shipping: address
        ? {
            name: name || undefined,
            address: {
              line1: address.line1 || undefined,
              city: address.city || undefined,
              postal_code: address.postal_code || undefined,
              country: address.country || undefined,
            },
          }
        : undefined,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Checkout Session (hosted Stripe Checkout)
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body; // expect array of { title, price, quantity }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((it) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: it.title },
          unit_amount: Math.round(Number(it.price) * 100),
        },
        quantity: it.quantity || 1,
      })),
      mode: 'payment',
      success_url: process.env.CHECKOUT_SUCCESS_URL || 'http://localhost:5173/success',
      cancel_url: process.env.CHECKOUT_CANCEL_URL || 'http://localhost:5173/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
