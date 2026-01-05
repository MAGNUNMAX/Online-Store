
/* POST /cart/create */


export const createCart = async (req, res) => {
  const user_id = req.user.id; // o viene del token

  try {
    // verificar si ya tiene carrito
    const existingCart = await pool.query(
      'SELECT id FROM carts WHERE user_id = $1',
      [user_id]
    );

    if (existingCart.rows.length > 0) {
      return res.json({ cart_id: existingCart.rows[0].id });
    }

    // crear carrito
    const { rows } = await pool.query(
      'INSERT INTO carts (user_id) VALUES ($1) RETURNING id',
      [user_id]
    );

    res.json({ cart_id: rows[0].id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
