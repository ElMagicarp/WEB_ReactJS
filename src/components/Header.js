import React from 'react';
import Logo from '../assets/logo.png';
import "../index.css";


function Header() {
  return (
    <div className="header">
            <img className="logo" src={Logo} alt="logo"/>
    </div>
  )
}

export default Header;