import React, { useEffect, useState } from "react";
import CartItem from "../../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderAsync } from "../../../service/redux/orderSlice";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import {emptyCart} from '../../../service/redux/cartSlice'

export default function ReviewItems({ orderdata }) {
  const cartItems = useSelector((state) => state.cart.items);

  const [cartItemList, setCartItemList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    setCartItemList(cartItems);
    const sum = cartItems.reduce(
      (totalPrice, item) => totalPrice + item.data.price * item.quantity,
      0.0
    );
    setCartTotal(sum.toFixed(2));
  }, [cartItems]);

  const token = useSelector((state) => state.auth.token);

  const nav = useNavigate();
  const dispatch = useDispatch();
  async function handlePlaceOrder() {
    setLoading(true);
    setErrMsg("");
    console.log(JSON.stringify(cartItems));
    const newOrderdata = {
      items: cartItems,
      totalPrice: cartTotal,
      totalItems: cartItemList.length,
      paymentMethod: orderdata.paymentMethod,
      address: orderdata.address,
    };
    try {
      const data = newOrderdata;
      const result = await dispatch(placeOrderAsync({ data, token }));
      console.log(token);
      if (result) nav("/");
      dispatch(emptyCart())
    } catch (err) {
      console.error("Order place error:", err);
      setErrMsg("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="">
      {cartItemList.map((item) => (
        <div>
          <CartItem key={item.productId} item={item} />
        </div>
      ))}

      <div className="checkout-field-item-desc">
        {orderdata.paymentMethod === "cod" ? (
          <>
            <button onClick={handlePlaceOrder} className="text-button add">
              Place order
            </button>
            <div className="add">
              <text>Keep cash ready for the delivery.</text>
            </div>
          </>
        ) : (
          <>
            <button onClick={handlePlaceOrder} className="text-button add">
              Proceed and Pay
            </button>
            <div className="add">
              <text>You'll be securely redirected to the payment gateway.</text>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
