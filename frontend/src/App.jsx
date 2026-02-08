import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from './store/store';

import Header from './component/Header';
import Banner from './component/Banner';
import UpdateMain from './component/UpdateMain';
import Clothing from './component/Clothing';
import Categories from './component/Categories';
import Footwear from './component/FootWear';
import Sale from './component/Sale';
import Footer from './component/footer';
import UnicProduct from './component/UnicProduct';
import Cart from './component/Cart';
import Checkout from './component/Checkout';
import  LoginForm  from './component/Login';
import PrivateRoute from './component/PrivateRoute';
import Success from './component/Success';
import Cancel from './component/Cancel';

import './App.css';

function App() {
  const { products, isAuth } = useContext(StoreContext);

  return (
    <Router>
      <div className="container">


        {/* Solo si está logueado */}
        {isAuth && <Header />}
        {isAuth && <Banner />}
       

        <Routes>
          {/* Login */}
          <Route path="/login" element={<LoginForm />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <UpdateMain products={products} />
              </PrivateRoute>
            }
          />

          <Route path="/Clothing" element={<PrivateRoute><Clothing /></PrivateRoute>} />
          <Route path="/Footwear" element={<PrivateRoute><Footwear /></PrivateRoute>} />
          <Route path="/Category" element={<PrivateRoute><Categories categories={products} /></PrivateRoute>} />
          <Route path="/Sale" element={<PrivateRoute><Sale /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute><UnicProduct /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>

        {isAuth && <Footer />}
      </div>
    </Router>
  );
}

export default App;
