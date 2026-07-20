import React from 'react'
import './Explore.css'
import { Link } from 'react-router-dom';
import { lista_categorie } from '../../assets/assets'
import { Card, CardContent, Typography, Button } from '@mui/material'

const Explore = () => {
  return (
    <div className='explore position-relative' id='explore' style={{ overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: '0%', left: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0, 123, 255, 0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '0%', right: '10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
      }} />

      <div className='container mt-5 position-relative' style={{ zIndex: 1 }}>
        <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 'bold', color: '#fff' }}>
          Scegli la tua categoria preferita
        </Typography>

        <div className='row justify-content-center'>
          <div className="col-12 col-lg-10">

            {lista_categorie.map((item, index) => {
              return (
                <Card 
                  key={index} 
                  sx={{ 
                    mb: 4, 
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    backgroundImage: 'none',                      
                    backdropFilter: 'blur(20px)',                 
                    WebkitBackdropFilter: 'blur(20px)',           
                    border: '1px solid rgba(255, 255, 255, 0.12)', 
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)', 
                  }}
                >
                  <CardContent className="p-0">
                    <div className="row align-items-center m-0">
                      
                      <div className="col-12 col-md-4 text-center p-4" style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <img 
                          src={item.immagine_cat} 
                          alt={item.categoria} 
                          style={{ width: '120px', borderRadius: '50%', backgroundColor: '#fff', padding: '10px' }} 
                        />
                        <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                          {item.categoria}
                        </Typography>
                      </div>

                      <div className="col-12 col-md-8 p-4 text-start">
                        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.8)' }}>
                          {item.descrizione || `Esplora la nostra incredibile selezione per la categoria ${item.categoria}. Troverai i migliori prodotti selezionati appositamente per le tue esigenze, garantendo qualità e innovazione.`}
                        </Typography>

                        <Link to={`/products?categoria=${item.categoria}`}>
                        <Button 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: '30px', 
                            color: '#fff', 
                            borderColor: 'rgba(255,255,255,0.4)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                              borderColor: '#fff',
                              backgroundColor: 'rgba(255,255,255,0.1)'
                            }
                          }} 
                          size="large"
                        >
                          Esplora {item.categoria}
                        </Button></Link>
                        
                      </div>

                    </div>
                  </CardContent>
                </Card>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore