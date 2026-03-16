import pool from '../database/db.js';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//syncronizing api data save from api

export const syncProducts = async () => {
  try {
    // Read from local product.json instead of fetching
    const productJsonPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'product.json');
    const data = JSON.parse(fs.readFileSync(productJsonPath, 'utf8'));
    const first20 = data.slice(0, 20);

    for (let i = 0; i < first20.length; i++) {
      const product = first20[i];
      await pool.query(
        `INSERT INTO products (id_product, name, description, price, stock, image_url,category)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id_product)
         DO UPDATE SET 
           name = EXCLUDED.name, 
           description = EXCLUDED.description, 
           price = EXCLUDED.price, 
           image_url = EXCLUDED.image_url,
           category = EXCLUDED.category`,
        [
          i + 1, // use index +1 as id
          product.title,
          product.description,
          29.99, // default price
          10, // default stock
          product.image || null,
          'clothing' // default category
        ]
      );
    }

    console.log('Productos sincronizados correctamente');

  } catch (err) {
    console.error('Error sincronizando productos:', err.message);
  }
};



//llamar al carrito 

export const callCart = async(cart_id)=>{
  try {

    const {rows} = await pool.query(`
      SELECT p.name, p.price, ci.quantity
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.cart_id = $1`,[cart_id]
      );

    return rows;
    
  } catch (error) {
    
    console.error('Error loading cart information', error.message);
    throw error;
  }
};





/* // eliminar producto 

export const DeleteProduct = async (cart_id, product_id)=>{
  try {
    
    await pool.query(`

       DELETE FROM cart_items
       WHERE cart_id = $1 AND product_id = $2`,[cart_id,product_id]

      );

    return { message: 'Product removed successfully' };
 
  } catch (error) {

    console.error(`Error Delecting product width id ${product_id}`,err.message);
    throw error;
  }
}; */



/* //vaciar carrito

export const emptyCart = async(cart_id)=>{
   
  try {
    await pool.query(`
      DELETE FROM cart_items WHERE cart_id = $1`,[cart_id]
      );

      return { message: 'Cart emptied successfully' };

  } catch (error) {
    console.error(`Cart width ${cart_id} cant be empty` , err.message);
  }
} */


/* 
-------------------------flujo mental ----------------------------------------- */
/* 


Usuario entra
   ↓
Crear carrito → cart_id
   ↓
Guardar cart_id
   ↓
Click producto
   ↓
cart_items usa cart_id + product_id
   ↓
JOIN products para mostrar info


 */