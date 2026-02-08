import React from 'react';
import { useNavigate } from 'react-router-dom';

function Cancel() {
  const navigate = useNavigate();
  return (
    <div className="container text-center mt-5">
      <h1>Pago cancelado</h1>
      <p>Se canceló el proceso de pago. Puedes intentarlo de nuevo o revisar tu carrito.</p>
      <button className="btn btn-secondary" onClick={() => navigate('/cart')}>Ver carrito</button>
    </div>
  );
}

export default Cancel;
