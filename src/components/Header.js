import React from 'react';
import Logo from '../assets/logo.png';
import "../index.css";


function Header() {
  return (
    <div className="header">
        <div className="leftSide">
            <img src={Logo} />
        </div>
        <div className="rightSide">
        </div>
    </div>
  )
}

export default Header;