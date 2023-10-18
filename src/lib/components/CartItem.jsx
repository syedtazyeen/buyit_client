import React from "react";
import "../styles/CartSlider.css";
import IconButtonSmall from "./IconButtonSmall";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../service/redux/cartSlice";
import { GrAdd, GrSubtract } from "react-icons/gr";

const CartItem = ({ item, onRemove }) => {
  const { productId, name, price, imgUrl } = item.data;
  const quantity = item.quantity;

  const dispatch = useDispatch();

  function removeItem(productId) {
    dispatch(removeItemFromCart({ productId }));
  }
  function addToCart() {
    const data = item.data;
    dispatch(addItemToCart({ data }));
  }

  return (
    <div className="cart-item">
      <div className="item-details-left">
        <img src={imgUrl} />
        <div className="item-name-box">
          <p className="item-name">{name}</p>
          <p className="item-quantity">x {quantity}</p>
        </div>
      </div>

      <div className="item-details-right">
        <p className="item-price">₹ {(price*quantity).toFixed(2)}</p>
        <div className="item-quantity add">
          <button
            onClick={() => removeItem(productId)}
            className="cart-item-button"
          >
            <GrSubtract />
          </button>
          <text>{quantity}</text>
          <button onClick={addToCart} className="cart-item-button">
            <GrAdd />
          </button>
        </div>
        {/* {quantity > 1 ? (
          <div className="item-quantity add">
            <button
              onClick={() => removeItem(productId)}
              className="cart-item-button"
            >
              <GrSubtract />
            </button>
            <text>{quantity}</text>
            <button onClick={addToCart} className="cart-item-button">
              <GrAdd />
            </button>
          </div>
        ) : (
          <IconButtonSmall
            //onClick={() => onRemove(id)} className="remove-button
            onClick={() => removeItem(productId)}
            icon={<MdDeleteOutline />}
          />
        )} */}
      </div>
    </div>
  );
};

export default CartItem;
