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
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.static('dist'));
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST); //payment





app.delete('/delete/:id',deleteProduct);

app.post('/user/add',addCartProduct);

syncProducts();                            //syncronizing data code query.js

// Home route to fetch products
app.get('/api/products',allProducts);







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
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
