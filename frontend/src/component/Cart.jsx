/* Checkout Principal, se muestra productos , checkout.jsx crea el total enviado desde aqui , checkout.jsx hace la coneccion con stripe */

import { useContext  } from "react";
import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom"; 






function Cart() {

  const { checkoutData } = useContext(StoreContext);

  const { cart,setCheckoutData } = useContext(StoreContext);
  const navigate = useNavigate();

  if(cart.length === 0){
    return null;
  };

  return(
   <div className="container-fluid border border-primary text-white">
    <div className="row border border-info p-3">
      <div className="col-12 display-4">Cart
        <div className="btn-group float-end">
          <button className="btn btn-outline-secondary btn-sm btn-primary text-white me-2" onClick={() => navigate("/")}>Continue Shopping</button>
          <button className="btn btn-outline-secondary btn-sm btn-success text-white" onClick={() => { setCheckoutData(cart.reduce((total, item) => total + item.price, 0).toFixed(2)); navigate("/checkout"); }}>CheckOut</button>
        </div>
      </div>
    </div>
    <div className="row border border-success p-3">
      <div className="col-6 border border-danger"> Product show
        {cart.map((item, index) => (
          <div key={index} className="d-flex align-items-center mb-4">
            <img  src={item.image} alt={item.title} className="rounded me-3" width="80" height="80" />
            <div>
              <h4 className="mb-1 fw-semibold text-white">{item.title}</h4>
              <p className="text-secondary mb-1">${item.price}</p>
            </div>
          </div>
        ))}
        
        
      </div>



      <div className="col-6 border border-warning"> payment Show 

        <h1>Total ${checkoutData}</h1>
        
      </div>
    </div>
   </div>
  );
}
export default Cart;
