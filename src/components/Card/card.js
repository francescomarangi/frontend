import React from 'react';
import { Link } from 'react-router-dom';

import { Card as MuiCard, CardContent, Typography, Button, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Card = ({ card, onIncrement }) => {
    return (

        <MuiCard sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backgroundImage: 'none',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
            }
        }}>
            
            <Link to={`/product/${card._id}`} style={{ textDecoration: 'none' }}>
                <Box sx={{
                    height: '220px',
                    backgroundColor: '#fff',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <img 
                        src={`https://backend-z8n1.onrender.com/${card.image}`} 
                        alt={card.name} 
                        style={{ 
                            maxHeight: '100%', 
                            maxWidth: '100%', 
                            objectFit: 'contain' 
                        }} 
                    />
                </Box>
            </Link>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                <Link to={`/product/${card._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, color: '#fff' }}>
                        {card.name}
                    </Typography>
                </Link>
                
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: 'rgba(255,255,255,0.6)', 
                        mb: 2, 
                        flexGrow: 1, 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden' 
                    }}
                >
                    {card.description}
                </Typography>

               <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4dabf5', mb: 3 }}>
                €{(card.price || 0).toFixed(2)}
                </Typography>

                <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => onIncrement(card)}
                    startIcon={
                        <Badge badgeContent={card.quantita || 0} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                    sx={{
                        borderRadius: '20px',
                        color: '#fff',
                        borderColor: 'rgba(255,255,255,0.3)',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: '#fff'
                        }
                    }}
                >
                    Aggiungi al carrello
                </Button>
            </CardContent>
        </MuiCard>
    );
}

export default Card;