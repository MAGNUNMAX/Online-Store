import React from "react";
import { useContext  } from "react";
import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom"; 


function ComponentCART(){               //el componente se esta renderizando en APP.jsx para produccion

    const { cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getCartTotal } = useContext(StoreContext);
    const navigate = useNavigate();

    if(cart.length === 0){
        return null;
    };

    return(
        <div className="container text-white">
             {cart.map((item) => (
                    <React.Fragment key={item.id}>

            <div className="row mt-3 border border-sucess align-items-center">
                
                        <div className="col-auto border border-danger">
                            <img  src={item.image} alt={item.title} className="rounded me-3" width="80" height="80" />
                        </div>
                        <div className="col border border-primary">{item.title}</div>
                        <div className="col-auto border border-info">$ {item.price}</div>
                        <div className="col-auto border border-danger d-flex align-items-center">
                            <button className="btn btn-outline-danger" onClick={() => removeFromCart(item.id)}>X</button>
                        </div>
                 
            </div>

            <div className="row border mb-3 border border-danger d-flex align-items-center">

                <div className="col-4 text-success border border-warning d-flex justify-content-center align-items-center"> 
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => decrementQuantity(item.id)}>-</button>
                    <div className="px-2">Qty: {item.quantity || 1}</div>
                    <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
                <div className="col-4 border border-primary d-flex justify-content-center align-items-center">
                    <button className="btn btn-outline-secondary btn-sm btn-primary text-white " onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
                <div className="col-4 border border-primary d-flex justify-content-center align-items-center">
                     <button className="btn btn-outline-secondary btn-sm btn-success text-white" onClick={() => { /* ensure total is up-to-date */ navigate('/checkout'); }}>CheckOut</button>
                </div>

            </div>

               </React.Fragment>
                 ))}
        
         </div>

    );

}

export default ComponentCART;