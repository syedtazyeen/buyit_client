import React, { useEffect } from 'react';
import './index.css'
import './lib/styles/Global.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './lib/layouts/MainLayout';
import Home from './lib/pages/Home'
import NotFound from './lib/pages/NotFound';
import Checkout from './lib/pages/Checkout';
import Signup from './lib/pages/Signup';
import Login from './lib/pages/Login';
import Categories from './lib/pages/Categories';

function App() {

  const navigate = useNavigate();
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      navigate('/home');
    }
  }, [navigate]);

  return (

    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/product/:itemId' />
        <Route path='/home' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/categories/:category' element={<Categories />} />
        {/* <Route path='/checkout'/> */}
      </Route>
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

  );
}

export default App;
