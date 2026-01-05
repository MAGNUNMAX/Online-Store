import React,{useEffect,useContext} from "react";

import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom";


function UnicProduct() {

  const { unicImageId, image, setImage } = useContext(StoreContext);
  const Id = unicImageId?.id || unicImageId;
  const navigate = useNavigate();




  useEffect(()=>{

    if(!Id) return;

    fetch(`http://localhost:5000/api/products/${Id}`)
    .then((res)=>res.json())
    .then((data)=>setImage(data))
    .catch((err)=>console.error("Error",err));
  }, [Id, setImage]);
 
  if(!image) return <p>Loading..... </p>;

  const fallbackImg = "/assets/fallbackImg/blackpolo.png";  

  return (
 
    <div className="container-fluid  col-12 mb-2 mt-3 ">

    <div  className="card bg-dark text-white rounded-0 h-100 d-flex flex-row">
    {/* Imagen a la izquierda */}
    
    <div className="d-flex flex-column align-items-center p-3 m-5 ">
      <img
        src={image.image}
        alt={image.title}
        className="img-fluid"
        style={{ maxWidth: "150px", height: "auto" }}
        onError={(e) => (e.target.src = fallbackImg)}
      />
      <p className="fw-bold mt-2">{`Price: $${image.price}`}</p>
    </div>

    {/* Descripción y botón a la derecha */}
    <div className="card-body d-flex flex-column justify-content-between">
      <div>
       
      
        <h5 className="card-title">{image.title}</h5>
        <p className="card-text">{image.description}</p>
      </div>
      <button
        className="btn btn-bgcolor align-self-start mt-2"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        CLOSE
      </button>
    </div>
  </div>
</div>





    
  );
}


export default UnicProduct;