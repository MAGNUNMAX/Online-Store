import React,{useEffect,useContext} from "react";

import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom";


function UnicProduct() {

  const { cart,setCheckoutData } = useContext(StoreContext); // update Total in Cart

  const { unicImageId, image, setImage,setCart } = useContext(StoreContext);
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
 <>
    <div className="card col-12 mb-3 mt-3 bg-dark text-white" style={{maxHeight: "540px"}} >
  <div className="row g-0">
    <div className="col-md-4" >
      <img src={image.image} className="img-fluid rounded-start" alt={image.title}  style={{maxHeight: "340px"}} onError={(e) => (e.target.src = fallbackImg)} />
    </div>
    <div className="col-md-8 ">
      <div className="card-body">
        <h5 className="card-title">{image.title}</h5>
        <p className="card-text">{image.description}</p>
        <p className="card-text"><small className="text-success h4">Price $ : {image.price}</small></p>

      <div className="d-flex justify-content-between">
        <button
        className="btn btn-success align-self-start mt-2"
        onClick={(e) => {
          e.preventDefault();
          setCart((prevCart) => [...prevCart, image]);
          navigate("/cart");
          let cartPrice = cart.map(item => item.price);
          if(cartPrice.length===0){setCheckoutData(image.price)}else{setCheckoutData(cart.reduce((total, item) => total + item.price, 0).toFixed(2));} //Total in Cart
        }}
      >
       ADD TO CART
      </button>

      <button
        className="btn btn-bgcolor align-self-start mt-2  me-3 "
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
  </div>
</div>



</>
  );
}


export default UnicProduct;