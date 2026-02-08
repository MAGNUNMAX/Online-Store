import { StoreContext } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useMemo, useEffect } from 'react';

function Categories({ products: propProducts, fallbackImg: propFallback }) {
  const { products: ctxProducts, setUnicImageId, fallbackImg } = useContext(StoreContext);
  const products = Array.isArray(propProducts) ? propProducts : ctxProducts;
  const fallback = propFallback || fallbackImg;
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('All'); // <-- "All" por defecto

  // Agrupar productos por categoría
  const categoriesProducts = useMemo(() => {
    const map = {};
    products.forEach((product) => {
      const category = product.category || 'Uncategorized';
      if (!map[category]) map[category] = [];
      map[category].push(product);
    });
    return map;
  }, [products]);

  const categoryKeys = ['All', ...Object.keys(categoriesProducts)]; // <-- agregar "All" al inicio

  function handleClick(id) {
    setUnicImageId(id);
    navigate(`/product/${id}`);
  }

  if (!products.length) return <p style={{ padding: 20 }}>Loading products...</p>;

  // Productos a mostrar según la categoría seleccionada
  const productsToShow =
    selectedCategory === 'All' ? products : categoriesProducts[selectedCategory] || [];

  return (
    <main className="container mt-3">
      <p className="fs-2 text-white mt-4 mb-4">Featured Products</p>

      {/* 🔽 Dropdown de categorías */}
      <div className="mb-4">
        <select
          className="form-select w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categoryKeys.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Productos filtrados */}
      <div className="row">
        {productsToShow.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product.id)}
            className="col-12 col-md-6 col-lg-3 mb-4"
          >
            <div className="card bg-dark text-white rounded-0 h-100 d-flex flex-column">
              <img
                src={product.image_url || product.image || product.imageUrl || fallback}
                className="card-img-top mt-3"
                style={{ height: '180px', objectFit: 'contain' }}
                alt={product.title || 'Product Image'}
                onError={(e) => (e.target.src = fallback)}
              />

              <div className="card-body d-flex flex-column">
                <p className="fw-bold">{`Price: $${product.price}`}</p>
                <h5 className="card-title text-truncate">{product.description}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Categories;








