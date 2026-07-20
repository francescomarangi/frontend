import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { Typography, Button } from '@mui/material';
import politecnicoImg from '../../assets/Politecnico_di_Bari.png';

const Header = () => {
  return (
    <div className="header-hero container">
      <div className="row align-items-center w-100 m-0">
        <div className="col-12 col-md-6 mb-5 mb-md-0 text-start header-text-section">
          <Typography 
            variant="h2" 
            fontWeight="800" 
            sx={{ mb: 3, lineHeight: 1.1, color: '#fff', fontSize: { xs: '2.5rem', md: '3.5rem' } }}
          >
            Il Catalogo Ufficiale del <br />
            <span style={{ color: '#4dabf5' }}>Politecnico di Bari</span>
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.7)' }}>
            Esplora la nostra selezione esclusiva. Dai dispositivi tecnologici all'arredamento, tutto ciò che ti serve per il tuo futuro accademico.
          </Typography>
          
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '30px', 
                padding: '12px 32px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                }
              }}
            >
              Vedi il nostro catalogo
            </Button>
          </Link>
        </div>

        <div className="col-12 col-md-6 text-center">
          <img 
            src={politecnicoImg} 
            alt="Politecnico di Bari" 
            className="header-premium-image"
          />
        </div>

      </div>
    </div>
  )
}

export default Header