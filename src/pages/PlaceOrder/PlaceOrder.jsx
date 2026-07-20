import React from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'

import { Container, Card, CardContent, Typography, Box, Button, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const PlaceOrder = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const totale = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantita,
    0
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 10 }}>
      
      <Typography variant="h3" sx={{ fontWeight: '800', color: '#fff', mb: 4, letterSpacing: '-1px' }}>
        Il tuo carrello
      </Typography>

      <Card sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backgroundImage: 'none',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px', // Tornati ai bordi eleganti
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3 }}>
                Il carrello è vuoto.
              </Typography>
              <Link to="/products" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" sx={{ color: '#4dabf5', borderColor: 'rgba(77, 171, 245, 0.5)', borderRadius: '30px', px: 4 }}>
                  Torna al catalogo
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <React.Fragment key={item._id}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    py: 2.5
                  }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flex: 1 }}>
                      {item.image && (
                        <Box sx={{ width: '65px', height: '65px', backgroundColor: '#fff', borderRadius: '12px', p: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                           <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </Box>
                      )}
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', lineHeight: 1.2 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                          €{(item.price || 0).toFixed(2)} cad.
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '30px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      px: 1,
                      mt: { xs: 2, sm: 0 }
                    }}>
                      <IconButton onClick={() => removeFromCart(item._id)} size="small" sx={{ color: item.quantita === 1 ? '#ff4d4d' : 'rgba(255,255,255,0.7)' }}>
                        {item.quantita === 1 ? <DeleteIcon fontSize="small" /> : <RemoveIcon fontSize="small" />}
                      </IconButton>
                      
                      <Typography sx={{ color: '#fff', fontWeight: 'bold', mx: 2, minWidth: '24px', textAlign: 'center', fontSize: '1rem' }}>
                        {item.quantita}
                      </Typography>
                      
                      <IconButton onClick={() => addToCart(item)} size="small" sx={{ color: '#4dabf5' }}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', minWidth: '90px', textAlign: 'right', mt: { xs: 2, sm: 0 } }}>
                      €{((item.price || 0) * item.quantita).toFixed(2)}
                    </Typography>

                  </Box>
                  
                  {index !== cartItems.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
                </React.Fragment>
              ))}

              <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mt: 4, mb: 3, borderWidth: '1px' }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-end' } }}>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Totale da pagare
                </Typography>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: '900', mb: 3 }}>
                  €{totale.toFixed(2)}
                </Typography>

                <Link to="/payment" style={{ textDecoration: 'none', width: '100%', maxWidth: '320px' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      borderRadius: '30px',
                      padding: '12px 14px',
                      fontWeight: '800',
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': { backgroundColor: '#e0e0e0', transform: 'scale(1.02)' },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Procedi al pagamento
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default PlaceOrder;