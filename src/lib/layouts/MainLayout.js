import React, { useEffect, useRef, useState } from "react";
import DefaultHeader from "../components/DefaultHeader";
import { useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Catrgories from "../pages/Categories";
import Footer from "../containers/Footer";
import CartSlider from "../containers/CartSlider";

export default function MainLayout() {
  const [currentPage, setCurrentPage] = useState();
  const prevPathRef = useRef();

  const [isCartOpen, setCartOpen] = useState(false)

  const loc = useLocation();

  function handleCartOpen() {
    setCartOpen(!isCartOpen)
  }

  useEffect(() => {
    const currentPath = loc.pathname;

    // Restore scroll position if the current page changes
    prevPathRef.current = loc.pathname;
    if (currentPath === prevPathRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    if (currentPath.endsWith('/home')) {
      setCurrentPage(<Home />);
    } else if (currentPath.includes('/product')) {
      setCurrentPage(<Product />);
    } else if (currentPath.includes('/categories')) {
      setCurrentPage(<Catrgories />)
    }
    //  else if (currentPath.endsWith('/checkout')) {
    //   setCurrentPage(<Checkout/>)
    // }
    
    
  }, [loc.pathname]);

  return (
    <div className="main">
      <DefaultHeader handleCartOpen={handleCartOpen} />
      <CartSlider isOpen={isCartOpen} handleCartOpen={handleCartOpen} />
      <div className="container min-h">{currentPage}</div>
      <Footer />
    </div>
  );
}

