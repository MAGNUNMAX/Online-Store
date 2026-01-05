import React, { useContext } from "react";
import { StoreContext } from "../store/store";  
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm"; //pago
import { loadStripe } from "@stripe/stripe-js";  //pago
import { Elements } from "@stripe/react-stripe-js";//pago





function Checkout() {
    const navigate = useNavigate();

    const { checkoutData } = useContext(StoreContext);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); //pago

    
    return (
    <>
      <div className="card">    
        <div className="card-header">
            CHECKOUT 🛒
        </div>
        <div className="card-body">
            <h2>Total Amount : ${checkoutData}</h2>
            <h5 className="card-title">Insert Card Number:</h5> 
            <p className="card-text">Address Information:</p>
            
        </div>
        
        <Elements stripe={stripePromise}>   <CheckoutForm /> </Elements> {/* pago , */}
        <button onClick={() => navigate("/")} className="btn btn-success">Continue shopping</button>
      </div>
    </>
    );
  } 
    export default Checkout;