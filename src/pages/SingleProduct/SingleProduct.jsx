import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ReviewSection from '../../components/ReviewSection/ReviewSection';

// Importiamo Material-UI per lo stile elegante
import { Container, Grid, Typography, Box, Button, IconButton, Chip, Divider, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SingleProduct = () => {
  const { id } = useParams();
  const { cartItems, addToCart, removeFromCart } = useCart();
  
  const [prodotto, setProdotto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error('Prodotto non trovato nel database.');
          throw new Error('Errore di connessione al server.');
        }
        const data = await response.json();
        setProdotto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress sx={{ color: '#4dabf5' }} />
    </Box>
  );

  if (error || !prodotto) return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <Typography variant="h5" sx={{ color: '#ff4d4d' }}>
        {error || "Prodotto non trovato."}
      </Typography>
    </Container>
  );

  // Cerchiamo il prodotto nel carrello tramite l'_id di Mongo
  const itemNelCarrello = cartItems.find((item) => item._id === prodotto._id);
  const quantita = itemNelCarrello ? itemNelCarrello.quantita : 0;

  return (
    <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
        
        {/* Colonna Sinistra - Immagine del Prodotto */}
        <Grid item xs={12} md={6}>
          <Box sx={{
            backgroundColor: '#fff',
            borderRadius: '24px',
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            height: '100%',
            minHeight: '400px'
          }}>
            <img 
              src={`http://localhost:5000/${prodotto.image}`} 
              alt={prodotto.name} 
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
            />
          </Box>
        </Grid>

        {/* Colonna Destra - Dettagli del Prodotto */}
        <Grid item xs={12} md={6}>
          
          <Chip 
            label={prodotto.category} 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              color: '#fff', 
              fontWeight: 'bold',
              mb: 2,
              borderRadius: '8px'
            }} 
          />
          
          <Typography variant="h3" sx={{ color: '#fff', fontWeight: '900', mb: 2, letterSpacing: '-1px' }}>
            {prodotto.name}
          </Typography>

          <Typography variant="h4" sx={{ color: '#4dabf5', fontWeight: 'bold', mb: 4 }}>
            €{(prodotto.price || 0).toFixed(2)}
          </Typography>

          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.7, mb: 5 }}>
            {prodotto.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {quantita === 0 ? (
              <Button 
                variant="contained" 
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={() => addToCart(prodotto)}
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': { backgroundColor: '#e0e0e0', transform: 'scale(1.02)' },
                  transition: 'all 0.2s ease'
                }}
              >
                Aggiungi al carrello
              </Button>
            ) : (
              //controllo se è già nel carrello
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.1)',
                px: 2,
                py: 0.5
              }}>
                <IconButton onClick={() => removeFromCart(prodotto._id)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  <RemoveIcon />
                </IconButton>
                
                <Typography sx={{ color: '#fff', fontWeight: 'bold', mx: 3, fontSize: '1.2rem' }}>
                  {quantita}
                </Typography>
                
                <IconButton onClick={() => addToCart(prodotto)} sx={{ color: '#4dabf5' }}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {quantita > 0 && (
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', mt: 2 }}>
              Articolo aggiunto! Vai al carrello in alto a destra per completare l'ordine.
            </Typography>
          )}

        </Grid>
      </Grid>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mt: 8, mb: 6 }} />
      <Box>
        <ReviewSection productId={prodotto._id} />
      </Box>

    </Container>
  );
};

export default SingleProduct;