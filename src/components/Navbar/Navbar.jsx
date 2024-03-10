import React, { useContext } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { authContext } from '../../Context/Auth/Auth';
import { cartContext } from '../../Context/Cart/Cart';

export default function Navbar() {
  const {token,setToken} = useContext(authContext);
  const {numOfItems} = useContext(cartContext)
  
  const navigate = useNavigate();

function logout (){
  setToken(null);
  localStorage.removeItem("tkn");
  navigate("/Login");
}

  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt='fresh market logo'/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token?<>        <li className="nav-item">
          <Link className="nav-link" to="/">home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/allorders">all orders</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to="/cart">cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {numOfItems}
    <span className="visually-hidden">unread messages</span>
  </span>
          </Link>
        </li></>:""}

      </ul>
    
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className='nav-item d-flex align-items-center'>
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
        </li>
        {token?<li onClick={logout} className="nav-item">
          <Link  className="nav-link" to="/login">logout</Link>
        </li>:<>        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">register</Link>
        </li></>}


      </ul>

    </div>
  </div>
</nav>
  </>
}
