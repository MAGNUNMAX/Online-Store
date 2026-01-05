export const addToCart = async (req, res) => {
  const { cart_id, product_id } = req.body;

  try {
    const existingItem = await pool.query(
      `
      SELECT id, quantity
      FROM cart_items
      WHERE cart_id = $1 AND product_id = $2
      `,
      [cart_id, product_id]
    );

    if (existingItem.rows.length > 0) {
      // si ya existe → aumentar cantidad
      await pool.query(
        `
        UPDATE cart_items
        SET quantity = quantity + 1
        WHERE cart_id = $1 AND product_id = $2
        `,
        [cart_id, product_id]
      );
    } else {
      // si no existe → insertar
      await pool.query(
        `
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES ($1, $2, 1)
        `,
        [cart_id, product_id]
      );
    }

    res.json({ message: 'Product added' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
