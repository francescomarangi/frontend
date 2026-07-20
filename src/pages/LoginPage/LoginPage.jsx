import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box, Card, CardContent, Typography, TextField, Button, Container } from "@mui/material";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    let result;

    if (isRegister) {
      result = await register(username, email, password);
    } else {
      result = await login(email, password);
    }
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  }
  const textFieldStyle = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&.Mui-focused fieldset': { borderColor: '#4dabf5', borderWidth: '1px' },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.6)',
      '&.Mui-focused': { color: '#4dabf5' }
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
          {isRegister ? "Crea un Account" : "Accedi"}
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: '#ff5252', backgroundColor: 'rgba(255, 82, 82, 0.1)', p: 1.5, borderRadius: '8px', mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            
            {isRegister && (
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={textFieldStyle}
              />
            )}
            
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={textFieldStyle}
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              inputProps={{ minLength: 6 }}
              sx={textFieldStyle}
            />

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              size="large"
              sx={{
                mt: 2,
                mb: 3,
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '30px',
                padding: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': { backgroundColor: '#e0e0e0' }
              }}
            >
              {isRegister ? "Registrati" : "Accedi"}
            </Button>
          </Box>

          <Typography align="center" variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            {isRegister ? "Hai già un account?" : "Non hai un account?"}
            <Button 
              variant="text" 
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              sx={{ 
                ml: 1, 
                color: '#4dabf5', 
                textTransform: 'none', 
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
              }}
            >
              {isRegister ? "Accedi" : "Registrati"}
            </Button>
          </Typography>

        </CardContent>
      </Card>
    </Container>
  );
}