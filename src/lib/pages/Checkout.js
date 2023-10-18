import React, { useEffect, useState } from 'react'
import '../styles/Checkout.css'
import Address from '../containers/checkout/Address'
import PaymentMethod from '../containers/checkout/PaymentMethod'
import Offers from '../containers/checkout/Offers'
import ReviewItems from '../containers/checkout/ReviewItems'
import SecureHeader from '../components/SecureHeader'

export default function Checkout() {

    const [currentTab, setCurrentTab] = useState(0)

    // class OrderModel{
    //     constructor(address,paymentMethod,items){
    //         this.address = address
    //         this.paymentMethod = paymentMethod
    //         this.items = items
    //     }
    // }

    const [orderData, setOrderData] = useState({ address: null, paymentMethod: null, items: null, sum: null })

    function nextTab() {
        setCurrentTab(currentTab + 1)
    }

    function changeCurrentTab(index) {
        setCurrentTab(index)
    }

    function updateOrderData(data) {
        setOrderData(data)
    }


    useEffect(() => {
        document.title = 'Checkout'
    }, [])


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };




    const containerList = [

        {
            name: "Address",
            selection: <></>,
            field: <Address nextTab={nextTab} orderdata={orderData} updateOrderData={updateOrderData} />,

        },
        {
            name: "Payment method",
            selection: <></>,
            field: <PaymentMethod nextTab={nextTab} orderdata={orderData} updateOrderData={updateOrderData} />,

        },
        {
            name: "Offers & Coupons",
            selection: <></>,
            field: <Offers nextTab={nextTab} orderdata={orderData} updateOrderData={updateOrderData} />,

        },
        {
            name: "Review items",
            selection: <></>,
            field: <ReviewItems orderdata={orderData} updateOrderData={updateOrderData} />,

        },



    ]



    return (
        <div>

            <SecureHeader title='Checkout'/>



            <div className='container'>
                <div className='checkout-container'>
                    {containerList.map((item, index) => (
                        <div
                            key={index}
                            className='checkout-section'>
                            <div
                                onClick={() => changeCurrentTab(index)}
                                className='checkout-head'>
                                <text>{item.name}</text>
                                <div>{item.selection}</div>
                            </div>
                            {currentTab === index &&
                                <div
                                    className='checkout-field'>
                                    {item.field}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}




