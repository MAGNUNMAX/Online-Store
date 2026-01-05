import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 30000 }), // $300.00 en centavos
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("✅ ¡Pago completado con éxito!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>             {/* Boton de pago Rojo */}
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
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
       Make a Payment
      </button>
      <p style={{ marginTop: "1rem" }}>{message}</p>
    </form>
  );
}

export default CheckoutForm;
