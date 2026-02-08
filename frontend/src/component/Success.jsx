import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();
  return (
    <div className="container text-center mt-5">
      <h1>Pago completado ✅</h1>
      <p>Gracias por tu compra. Tu pago se ha procesado correctamente.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
}

export default Success;
