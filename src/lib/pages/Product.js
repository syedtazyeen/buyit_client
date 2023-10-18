import React, { useEffect, useState } from 'react'
import '../styles/Product.css'
import HorizontalScroll from '../containers/HorizontalScroll'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from '../../service/redux/cartSlice';
import { GrAdd, GrSubtract } from 'react-icons/gr'

export default function Product() {
    const link = useParams()
    const [data, setData] = useState()

    const cartItems = useSelector((state) => state.cart.items);
    const [isInCart, setInCart] = useState(false)
    const [quantity, setQuantity] = useState(0)



    useEffect(() => {
        window.scrollTo({
            top: -10,
            behavior: 'smooth'
        });
        fetch("/api/products/" + link.itemId)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));


    }, [link])


    useEffect(() => {
        //const isPresentInCart = cartItems.some(item => item.data.productId === data?.productId);
        const index = cartItems.findIndex(item => item.data.productId === data?.productId);
        setInCart(index >= 0)
        if (index >= 0) {
            setQuantity(cartItems[index].quantity)
        }
        document.title = data?.name
    }, [cartItems, data])

    const dispatch = useDispatch();
    function addToCart() {
        dispatch(addItemToCart({ data }))
    }
    function removeFromCart(productId) {
        dispatch(removeItemFromCart({ productId }))
    }

    return (
        <div className='product-container'>
            <div className='product-display-container'>
                <img src={data?.imgUrl} />
                <div className='product-display-info-container'>
                    <p className='itemId'>#{link.itemId}</p>
                    <h1 className='name'>{data?.name}</h1>
                    <p className='desc'>{data?.desc}</p>
                    <h2 className='price'>₹&nbsp;{data?.price}</h2>

                    {
                        isInCart ? (
                            <div className='product-quantity add'>
                                <button
                                    onClick={() => removeFromCart(data?.productId)}
                                    className='product-button'><GrSubtract /></button>
                                <text>{quantity}</text>
                                <button
                                    onClick={addToCart}
                                    className='product-button'><GrAdd /></button>
                            </div>
                        ) : (

                            <button
                                onClick={addToCart}
                                className="text-button add">Add to Cart</button>
                        )
                    }

                </div>
            </div>
            <HorizontalScroll />
        </div>
    )
}
