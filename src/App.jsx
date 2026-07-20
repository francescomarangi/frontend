import Navbar from './components/Navbar/navbar';
import React, { Component, useState } from 'react';
import { CartProvider } from './context/CartContext';
import {AuthProvider} from './context/AuthContext'

import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Products from './pages/Products/Products';
import LoginPage from './pages/LoginPage/LoginPage'; 
import Payment from './pages/Payment/Payment';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import SingleProduct from './pages/SingleProduct/SingleProduct';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    }
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
});

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <CartProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <Navbar />
          
          <main className="main" style={{ flexGrow: 1, paddingTop: '80px' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path="/loginpage" element={<LoginPage/>} />
              <Route path='/placeorder' element={<PlaceOrder/>}/>
              <Route path='/profilepage' element={<ProfilePage/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/product/:id' element={<SingleProduct/>}/>
              
            </Routes>
          </main>

          <footer 
            className="footer py-4 text-center" 
            style={{ 
              borderTop: '1px solid #222', 
              backgroundColor: '#050505', 
              color: '#666',
              fontSize: '0.9rem'
            }}
          >
            &copy; {new Date().getFullYear()} Polizone - Politecnico di Bari
          </footer>
        </div>
      </ThemeProvider>
      </CartProvider>
      </AuthProvider>
      
      
    );
  }
}

export default App;