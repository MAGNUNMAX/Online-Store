
import React, { useState } from "react";

function Categories({ categories }) {

  //  Agrupar los productos por categoría

  const categoriesProducts = categories.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});


  // Estado para guardar la categoría seleccionada

  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(categoriesProducts)[0] // primera categoría por defecto
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center fs-2 mb-4 text-white">Products by Category</h1>

      {/*  Dropdown to choose category */}
      
      <div className="dropdown mb-4 text-center">
        <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" >
          {selectedCategory}
        </button>
        <ul className="dropdown-menu show"  aria-expanded="false">
          {Object.keys(categoriesProducts).map((Category) => (
            <li key={Category}>
              <button
                className="dropdown-item"
                onClick={() => setSelectedCategory(Category)}
              >
                {Category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🧾 Productos de la categoría seleccionada */}
      <div className="row">
        {categoriesProducts[selectedCategory].map((product, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card bg-dark text-white rounded-0 h-100">
              <img src={product.image} className="card-img-top h-50 w-50" alt={product.title} />
              <div className="card-body d-flex flex-column">
                <p className="fw-bold">{`Price: $${product.price}`}</p>
                <h5 className="card-title">{product.title}</h5>
          {/*       <p className="card-text">{product.description}</p> */}
            
                <button className="btn btn-bgcolor mt-auto">ADD TO CART</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;







