/* Checkout Principal, se muestra productos , checkout.jsx crea el total enviado desde aqui , checkout.jsx hace la coneccion con stripe */

import { useContext, useRef, useState } from "react";
import { StoreContext } from "../store/store";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, checkoutData, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const cardRef = useRef(null);
  const dateRef = useRef(null);
  const ccvRef = useRef(null);
  const clearInputs = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (cardRef.current) cardRef.current.value = '';
    if (dateRef.current) dateRef.current.value = '';
    if (ccvRef.current) ccvRef.current.value = '';
  };

  const handleMakePayment = () => {
    // Validar inputs: no permitir pago si hay campos vacíos
    const name = nameRef.current?.value?.trim();
    const card = cardRef.current?.value?.trim();
    const date = dateRef.current?.value?.trim();
    const ccv = ccvRef.current?.value?.trim();

    if (!name || !card || !date || !ccv) {
      setToast({ show: true, text: 'Please fill all payment fields' });
      setTimeout(() => setToast({ show: false, text: '' }), 3000);
      return;
    }

    if (!cart || cart.length === 0) {
      setToast({ show: true, text: 'No products to pay' });
      setTimeout(() => setToast({ show: false, text: '' }), 3000);
      return;
    }

    // Borrar todo el carrito (pago completo)
    clearCart();

    // mostrar aviso y limpiar inputs
    setToast({ show: true, text: 'payment received' });
    clearInputs();
    setTimeout(() => setToast({ show: false, text: '' }), 3000);
  };

  const [toast, setToast] = useState({ show: false, text: '' });

  // keep cart visible even when empty

  return (
    <div className="container-fluid border text-white p-3">
      
      {/* Título y botones */}
      <div className="row mb-3 border-bottom pb-3 align-items-center">
        <div className="col-12 col-md-6">
          <h1 className="display-4 text-center text-md-start">Cart</h1>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
          <button
            className="btn btn-outline-secondary btn-sm btn-primary text-white me-2"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
          {/* <button
            className="btn btn-outline-secondary btn-sm btn-success text-white"
            onClick={() => navigate("/checkout")}
          >
            CheckOut
          </button> */}
        </div>
      </div>

      {/* Contenido del carrito */}
      <div className="row g-3">

        {/* Lista de productos */}
        <div className="col-12 col-lg-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex flex-column flex-md-row align-items-center align-items-md-start mb-4 p-3 border rounded"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded mb-2 mb-md-0 me-md-3"
                style={{ width: 80, height: 80, objectFit: "contain" }}
              />
              <div className="text-center text-md-start">
                <h4 className="mb-1 fw-semibold text-white">{item.title}</h4>
                <p className="text-secondary mb-2">
                  ${item.price} x {item.quantity || 1}
                </p>
                <div className="d-flex justify-content-center justify-content-md-start">
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => decrementQuantity(item.id)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => incrementQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="container col-12 col-lg-4 border-start border-lg-start-0  p-3 d-flex align-items-center justify-content-center">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col ms-5">
                  <h2>Total: ${checkoutData}</h2>
                <input ref={nameRef} className="m-2" type="text" placeholder="Name" />
                <input ref={cardRef} className="m-2" type="number" placeholder="Card Number" />
                <input ref={dateRef} className="m-2" type="date" placeholder="Expiration Date" />
                <input ref={ccvRef} className="m-2 w-2" type="number" placeholder="CCV" />
              
              </div>
              <button 
                className="btn btn-outline-darksuccess btn-sm btn-success text-white fw-bold fs-5 mt-5 " onClick={handleMakePayment}>
                    Macke Payment
              </button>
            </div>
          </div>
        </div>
    {toast.show && (
      <div style={{position: 'fixed', right: 20, bottom: 20, background: '#111827', color: '#fff', padding: '12px 16px', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.3)', zIndex: 9999}}>
        {toast.text}
      </div>
    )}
    </div>
  );
}

export default Cart;

// Toast markup for payment feedback
/* Note: kept outside component export to keep file simple; rendered inside component via state */