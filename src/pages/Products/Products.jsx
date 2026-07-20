import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/card';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Typography, CircularProgress, Alert } from '@mui/material';

const Products = () => {
  const { cartItems, addToCart } = useCart();
  const [searchParams] = useSearchParams();
  
  const categoriaFiltro = searchParams.get('categoria');
  const searchQuery = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = 'http://localhost:5000/api/v1/products';
        const queryParams = new URLSearchParams();
        
        
        if (categoriaFiltro) queryParams.append('category', categoriaFiltro);
        if (searchQuery) queryParams.append('search', searchQuery);
        
        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Errore nel recupero dei prodotti dal server');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoriaFiltro, searchQuery]);

  const handleIncrement = (card) => {
    addToCart(card);
  };

  // UI di caricamento o errore
  if (loading) return <div className="container mt-5 text-center"><CircularProgress sx={{ color: '#fff' }} /></div>;
  if (error) return <div className="container mt-5"><Alert severity="error">{error}</Alert></div>;

  return (
    <div className="container mt-2">
      
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
        {searchQuery ? `Risultati per "${searchQuery}"` : categoriaFiltro ? `Categoria: ${categoriaFiltro}` : "Tutto il Catalogo"}
      </Typography>

      <div className="row g-4 mb-5">
        {products.length === 0 ? (
           <Typography sx={{ color: '#fff', ml: 2 }}>Nessun prodotto trovato in questa categoria.</Typography>
        ) : (
          products.map((card) => {
            const itemNelCarrello = cartItems.find((item) => item._id === card._id);
            const cardConQuantita = { ...card, quantita: itemNelCarrello ? itemNelCarrello.quantita : 0 };

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={card._id}>
                <Card
                  card={cardConQuantita}
                  onIncrement={handleIncrement}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;