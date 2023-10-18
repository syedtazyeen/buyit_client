import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import "../styles/Header.css";
import IconButton from "./IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrDeliver } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../../service/redux/authSlice";

export default function DefaultHeader({ handleCartOpen }) {
  const cartItems = useSelector((state) => state.cart.items);
  const [cartCount, setCartCount] = useState(0);

  const { user, token, error } = useSelector((state) => state.auth);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const nav = useNavigate();
  function handleSearchBtn() {
    nav("/categories");
  }

  function handleSignBtn() {
    nav("/signup");
  }

  const dispatch = useDispatch();
  async function handleLogout() {
    try {
      await dispatch(logout());
      nav("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="header">
      <div className="container header-container">
        <Link onClick={scrollToTop} to="/" className="link-style">
          <p className="logo">BuyIt.</p>
        </Link>
        <div className="header-menu">
          {user !== null && (
            <>
              <IconButton icon={<IoMdLogOut />} />
              <IconButton icon={<GrDeliver />} onclick={handleLogout} />
            </>
          )}

          {user === null && (
            <>
              <button onClick={handleSignBtn} className="text-button">
                Sign in
              </button>
            </>
          )}

          <IconButton icon={<LuSearch />} onClick={handleSearchBtn} />

          <div className="cart-icon">
            <IconButton
              icon={<AiOutlineShoppingCart />}
              onClick={handleCartOpen}
            />
            {cartCount > 0 && <text className="cart-count">{cartCount}</text>}
          </div>
        </div>
      </div>
    </div>
  );
}
