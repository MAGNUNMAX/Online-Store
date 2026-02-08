import React, { useContext, useState } from "react";
import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";  //pago





function Checkout() {
    const navigate = useNavigate();

    const { checkoutData, cart } = useContext(StoreContext);
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); //pago
    const [loading, setLoading] = useState(false);

    
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
        
        <div style={{ marginTop: 12 }}>
          <h5>Proceder al pago (Stripe Checkout)</h5>
          <button
            className="btn btn-primary"
            disabled={loading || !cart || cart.length === 0}
            onClick={async () => {
              if (!cart || cart.length === 0) return;
              setLoading(true);
              try {
                const items = cart.map((it) => ({ title: it.title, price: it.price, quantity: it.quantity || 1 }));
                const res = await fetch('http://localhost:5000/create-checkout-session', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ items }),
                });
                const data = await res.json();
                if (data?.id) {
                  const stripe = await stripePromise;
                  const result = await stripe.redirectToCheckout({ sessionId: data.id });
                  if (result.error) {
                    console.error(result.error.message);
                    setLoading(false);
                  }
                } else {
                  console.error('No session id returned', data);
                  setLoading(false);
                }
              } catch (err) {
                console.error('Checkout redirect error', err);
                setLoading(false);
              }
            }}
          >
            {loading ? 'Redirigiendo...' : `Pagar $${checkoutData || '0.00'}`}
          </button>
        </div>
        <button onClick={() => navigate("/")} className="btn btn-success">Continue shopping</button>
      </div>
    </>
    );
  } 
    export default Checkout;