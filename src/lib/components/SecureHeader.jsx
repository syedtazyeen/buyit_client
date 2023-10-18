import React from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function SecureHeader({ onClick, title }) {
  return (
    <header className="header">
      <div className="container header-container checkout-header">
        <div className="w-logo">
          <Link onClick={onClick} to="/" className="link-style">
            <p className="logo">BuyIt.</p>
          </Link>
        </div>
        <div  className="">
          <text>{title}</text>
        </div>
        <div className="checkout-header-label w-logo">
          <text>Secured</text>
          <BsShieldLockFill />
        </div>
      </div>
    </header>
  );
}
