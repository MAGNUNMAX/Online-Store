import pool from '../database/db.js';


export const allProducts =  async(req, res) => {                // home products calling from db
 try{

    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const data = await pool.query(`SELECT * FROM products ORDER BY id_product ASC LIMIT 20`);
    res.json(data.rows);
  
 }catch (error){
  console.error('Error loading products: ' , error.message);
  res.status(500).json({error:'Error loading product'});
 }
 
};




export const deleteProduct = async(req,res)=>{
  try { 
    const {id} = req.params;
      res.json({ message: `Producto con id ${id} eliminado correctamente.` });
  } catch (error) {
     res.status(500).json({error:'Error al obtener datos'});
  }
}




export const addCartProduct = async(req,res)=>{
    try {

        const data = req.body;
        res.json(data);
        console.log('este es la data' , data);

    } catch (error) {
        res.status(500).json({error:"error al agregar los datos"})
    }
}