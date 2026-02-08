
import { useContext } from 'react';
import {StoreContext} from '../store/store';
import { useNavigate } from 'react-router-dom';


function Collections({ products: propProducts, fallbackImg: propFallback, onSelect }) {

  const { products: ctxProducts, setUnicImageId, fallbackImg } = useContext(StoreContext);
  const products = Array.isArray(propProducts) ? propProducts : ctxProducts;
  const fallback = propFallback || fallbackImg;
  const navigate = useNavigate();

  function handleClick(id) {
    setUnicImageId(id);
    navigate(`/product/${id}`);
  }


     if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading products...</span>
        </div>
      </div>
    );
  }



    return(
        <>
          <main className="row mt-3">
           {products.map((product) => (
            <div key={product.id} onClick={()=>handleClick(product.id)} className="col-12 col-md-6 col-lg-3 mb-4">

      
                <div className="card bg-dark text-white rounded-0  h-100 d-flex flex-column ">

                              {
                                (() => {
                                  const src = product.image_url || product.image || product.imageUrl || '';
                                  return (
                                    <img src={src || fallback} className="card-img-top h-50 w-50 mt-3" alt={product.title || "Product Image"} onError={(e) => (e.target.src = fallback)} />
                                  );
                                })()
                              }

                <div className="card-body d-flex flex-column">
                    <p className="fw-bold">{`Price: $${product.price}`}</p>
                    <h5 className="card-title text-truncate">{product.description}</h5>
                  
                </div>
                </div>
            </div>
          ))}   
        </main>
              
      </>  
    )
}
export default Collections;