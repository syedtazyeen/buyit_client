import React, { useEffect, useState } from "react";
import "../styles/CartSlider.css";
import IconButton from "../components/IconButton";
import { MdClose } from "react-icons/md";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartSlider({ isOpen, handleCartOpen }) {
  const cartItems = useSelector((state) => state.cart.items);

  const [cartItemList, setCartItemList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    setCartItemList(cartItems);
    const sum = cartItems.reduce(
      (totalPrice, item) => totalPrice + item.data.price * item.quantity,
      0.0
    );
    setCartTotal(sum.toFixed(2));
  }, [cartItems]);

  const nav = useNavigate();
  function navigateToCheckout() {
    if (user) {
      nav("/checkout");
    } else {
      nav("/signup");
    }
    handleCartOpen();
  }

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-head">
          <p>Your Cart ({cartItemList.length})</p>
          <IconButton onClick={handleCartOpen} icon={<MdClose />} />
        </div>
        <div className="cart-body hide_scroll">
          {cartItemList.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
        <div className="cart-foot">
          <p>Cart total</p>
          <h3>₹ {cartTotal}</h3>
        </div>
        <button onClick={navigateToCheckout} className="text-button">
          Checkout
        </button>
      </div>
    </div>
  );
}
