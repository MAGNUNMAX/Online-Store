import React from "react";

import "./Checkout.css";

function Checkout() {
  return (
    <section className="checkout py-5">
      <div className="container text-white">
        {/* --- Header --- */}
        <div className="mb-4 text-center text-md-start">
          <h2 className="brand">REBEL THREADS</h2>
          <h1 className="fw-bold">CHECKOUT</h1>
        </div>

        <div className="row g-4">
          {/* --- Productos --- */}
          <div className="col-lg-8">
            <div className="card bg-dark border-0 p-4 shadow-lg">
              {/* Producto 1 */}
              <div className="d-flex align-items-center mb-4">
                <img
                  src="/images/hoodie.jpg"
                  alt="Heavyweight Essentials"
                  className="rounded me-3"
                  width="80"
                  height="80"
                />
                <div>
                  <h4 className="mb-1 fw-semibold text-white">
                    HEAVYWEIGHT ESSENTIALS
                  </h4>
                  <p className="text-secondary mb-1">$100</p>
                  <div className="btn-group">
                    <button className="btn btn-outline-secondary btn-sm">-</button>
                    <button className="btn btn-outline-secondary btn-sm disabled">
                      1
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">+</button>
                  </div>
                </div>
              </div>

              {/* Producto 2 */}
              <div className="d-flex align-items-center mb-4">
                <img
                  src="/images/shoes.jpg"
                  alt="Air Vapors"
                  className="rounded me-3"
                  width="80"
                  height="80"
                />
                <div>
                  <h4 className="mb-1 fw-semibold text-white">AIR VAPORS</h4>
                  <p className="text-secondary mb-1">$200</p>
                  <div className="btn-group">
                    <button className="btn btn-outline-secondary btn-sm">-</button>
                    <button className="btn btn-outline-secondary btn-sm disabled">
                      1
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">+</button>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                <span className="text-secondary fw-medium">SUB-TOTAL:</span>
                <span className="fw-semibold text-white fs-5">$300</span>
              </div>

              {/* Botón */}
              <button className="btn btn-danger mt-4 w-100 fw-bold py-2">
                PLACE ORDER
              </button>
            </div>
          </div>

          {/* --- Métodos de pago --- */}
          <div className="col-lg-4">
            <div className="card bg-dark border-0 p-4 shadow-lg text-center">
              <h3 className="text-secondary fw-semibold mb-4">PAY WITH</h3>
              <div className="d-flex flex-column align-items-center gap-3">
                <img src="/icons/creditcard.svg" alt="Credit Card" width="80" />
                <img src="/icons/paypal.svg" alt="PayPal" width="80" />
                <img src="/icons/gpay.svg" alt="Google Pay" width="80" />
                <img src="/icons/applepay.svg" alt="Apple Pay" width="80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;

