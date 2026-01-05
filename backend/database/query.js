import pool from '../database/db.js';
import fetch from 'node-fetch';

//syncronizing api data save from api

export const syncProducts = async () => {
  try {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    const first20 = data.slice(0, 20);

    for (const product of first20) {
      await pool.query(
        `INSERT INTO products (id_product, name, description, price, stock, image_url)
         VALUES ($1,$2,$3,$4,$5,$6)
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
          product.stock || 0,
          product.image || null
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