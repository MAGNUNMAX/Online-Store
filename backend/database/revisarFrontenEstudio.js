

/* { "cart_id": 3 } */

localStorage.setItem('cart_id', data.cart_id);



<img
  src={product.image}
  onClick={() => addToCart(product.id)}
/>


const addToCart = async (product_id) => {
  const cart_id = localStorage.getItem('cart_id');

  await fetch('/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart_id, product_id })
  });
};
