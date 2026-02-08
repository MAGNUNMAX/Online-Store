import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom";


function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkoutData, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkoutData || Number(checkoutData) <= 0) {
      setMessage("Cart total is empty.");
      return;
    }

    const amountCents = Math.round(Number(checkoutData) * 100);

    setLoading(true);
    const res = await fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountCents,
        name,
        email,
        address: {
          line1,
          city,
          postal_code: postalCode,
          country,
        },
      }),
    });

    const { clientSecret } = await res.json();

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
            address: {
              line1,
              city,
              postal_code: postalCode,
              country,
            },
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        setMessage("✅ ¡Pago completado con éxito!");
        clearCart();
        setTimeout(() => navigate('/'), 1200);
      }
    } catch (err) {
      setMessage(err.message || 'Payment error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "480px", margin: "auto" }}>
      <div style={{ marginBottom: 12 }}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" required />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" required />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Address line</label>
        <input value={line1} onChange={(e) => setLine1(e.target.value)} className="form-control" required />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <label>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} className="form-control" required />
        </div>
        <div style={{ width: 120 }}>
          <label>Postal</label>
          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="form-control" required />
        </div>
        <div style={{ width: 120 }}>
          <label>Country</label>
          <input value={country} onChange={(e) => setCountry(e.target.value)} className="form-control" required />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Card details</label>
        <div style={{ padding: 12, border: '1px solid #ccc', borderRadius: 6 }}>
          <CardElement />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "1rem",
          backgroundColor: "#FF4040",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor:"pointer"
        }}
      >
       {loading ? 'Processing...' : `Pay $${checkoutData || '0.00'}`}
      </button>
      <p style={{ marginTop: "1rem" }}>{message}</p>
    </form>
  );
}

export default CheckoutForm;
