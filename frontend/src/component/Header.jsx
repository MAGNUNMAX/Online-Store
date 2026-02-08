 import React from "react";
 import {Link} from 'react-router-dom';
 import '../CSS/Header.css';
 function Header(){
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-fondo">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"> <img src="icono/logo.png" alt="Logo" /> </a>
    <button className="navbar-toggler celnav-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    
  
    <div className="collapse navbar-collapse"   id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">  

        <li className="nav-item  text-color-fondo">
          <Link className="nav-link fw-bold" aria-current="page" to="/">HOME</Link>
        </li>

        <li className="nav-item  text-color-fondo">
          <Link className="nav-link fw-bold" aria-current="page" to="/Clothing">CLOTHING</Link>
        </li>
        
        {/* <li className="nav-item">
          <Link className="nav-link fw-bold" to="/Footwear">FOOTWEAR</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link fw-bold" to="/Category">CATEGORY</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link fw-bold" to="/Sale">SALE</Link>
        </li> */}

        <li className="cart-item  p-0">
          <Link className="nav-link cart" to="/cart"><img src="icono/cart.png" alt="Cart" /></Link>
        </li>
        <li className="acount-item me-5 p-0">
          <a className="nav-link acount" href="#"><img src="icono/acounticon.png" alt="account" /></a>
        </li>


        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/> </li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> 
        <li className="nav-item ">
          <a className="nav-link disabled"  aria-disabled="true">Disabled</a>
        </li>*/}
      </ul>

        {/* .......search and button .........*/}

      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit"  text-color-fondo>Search</button>
      </form> */}

    </div>
  </div>
</nav>
    </>
    )
 }

 export default Header;