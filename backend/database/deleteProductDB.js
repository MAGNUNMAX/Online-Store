

export const removeFromCart = async (req, res) => {
  const { cart_id, product_id } = req.body;

  await pool.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = $1 AND product_id = $2
    `,
    [cart_id, product_id]
  );

  res.json({ message: 'Product removed' });
};
