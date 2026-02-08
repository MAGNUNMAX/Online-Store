import pool from '../database/db.js';
import fetch from 'node-fetch';


export const syncProducts = async () => {
  try {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    const cloth = data.filter(d => ["men's clothing","women's clothing"].includes(d.category?.toLowerCase()).trim() ).slice(0, 20)


    for (const product of cloth) {
      await pool.query(
        `INSERT INTO products (id_product, name, description, price, image_url)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (id_product)
         DO UPDATE SET 
           name = EXCLUDED.name, 
           description = EXCLUDED.description, 
           price = EXCLUDED.price, 
           image_url = EXCLUDED.image_url`,
        [
          product.id,
          product.title,
          product.description,
          product.price,
          product.image || null
        ]
      );
    }

    console.log('Productos sincronizados correctamente');

  } catch (err) {
    console.error('Error sincronizando productos:', err.message);
  }
};