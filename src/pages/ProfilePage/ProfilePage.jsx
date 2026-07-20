import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { Box, Card, CardContent, Typography, TextField, Button, Container } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  if (!user) {
    return (
      <Container maxWidth="xs" sx={{ mt: 10, mb: 10, pt: 5 }}>
        <Typography variant="h5" sx={{ color: '#fff', textAlign: 'center' }}>
          Devi effettuare l'accesso per vedere questa pagina.
        </Typography>
      </Container>
    );
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const readOnlyFieldStyle = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' }, 
      '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' }, 
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.5)',
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, mb: 10, pt: 5 }}>
      
      <Card sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backgroundImage: 'none',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      }}>
        <CardContent sx={{ p: 4 }}>
          
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#fff', mb: 4 }}>
            Il tuo profilo
          </Typography>

          <Box>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={user.username || "Nessun username"}
              InputProps={{ readOnly: true }}
              sx={readOnlyFieldStyle}
            />
            
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={user.email || ""}
              InputProps={{ readOnly: true }}
              sx={readOnlyFieldStyle}
            />
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={user.password || "••••••••"} 
                InputProps={{ readOnly: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' }, 
                    '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' }, 
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  }
                }}
              />
              
              <Button
                variant="outlined"
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  color: '#4dabf5',
                  borderColor: 'rgba(77, 171, 245, 0.5)',
                  borderRadius: '12px',
                  px: 3, // Questo dà lo spessore
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': { 
                    backgroundColor: 'rgba(77, 171, 245, 0.1)',
                    borderColor: '#4dabf5'
                  }
                }}
              >
                {showPassword ? "Nascondi" : "Mostra"}
              </Button>
            </Box>

            <Button 
              fullWidth 
              variant="outlined" 
              size="large"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                mt: 2,
                color: '#ff4d4d',
                borderColor: 'rgba(255, 77, 77, 0.3)',
                borderRadius: '30px',
                padding: '10px',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 77, 77, 0.1)',
                  borderColor: '#ff4d4d' 
                }
              }}
            >
              Esci
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}