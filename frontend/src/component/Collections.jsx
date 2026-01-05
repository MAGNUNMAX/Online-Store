
import { useContext } from 'react';
import {StoreContext} from '../store/store';
import { useNavigate } from 'react-router-dom';


function Collections() {

  const { products, setUnicImageId, fallbackImg } = useContext(StoreContext);
  const navigate = useNavigate();

  function handleClick(id) {
    setUnicImageId(id);
    navigate(`/product/${id}`);
  }


     if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando productos...</span>
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

                    <img src={product.image_url} className="card-img-top h-50 w-50 mt-3" alt={product.title || "Product Image"} onError={(e) => (e.target.src = fallbackImg)} />

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