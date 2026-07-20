import React, { useState } from "react";
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { AppBar, Toolbar, TextField, InputAdornment, IconButton, Badge, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  }

  return (
    <AppBar position="fixed" className="navbar-premium" elevation={0}>
      <Toolbar className="navbar-toolbar container-fluid px-lg-5 py-2">

        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src={assets.logo} alt="Polizone" className="navbar-logo" />
        </Link>

        <Box 
          component="form" 
          onSubmit={handleSearchSubmit} 
          className="navbar-search-container"
          sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1
          }} 
        >
          <TextField
            placeholder="Cerca prodotti tecnologici o per la casa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            className="navbar-search-field"
            InputProps={{
              sx: {
                color: '#fff',
                borderRadius: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4dabf5', 
                    borderWidth: '1px'
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                },
              }
            }}
          />
          
          <IconButton 
            type="submit" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              transition: 'all 0.2s ease', 
              '&:hover': { 
                color: '#fff', 
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'scale(1.05)'
              } 
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        <div className="navbar-right-group">
          <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'rgba(255,255,255,0.6)' }}>
             <SearchIcon />
          </IconButton>

          <Link to="/placeorder">
            <IconButton sx={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s', '&:hover': {color: '#fff', transform: 'translateY(-2px)'} }}>
              <Badge 
                badgeContent={0}
                color="error"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>

          {user ? (
            <Link to="/profilepage" style={{ textDecoration: 'none' }}>
              <Button 
                variant="outlined"
                color="inherit"
                className="navbar-auth-btn user-btn"
                startIcon={<AccountCircleIcon />}
                sx={{ ml: 2, borderRadius: '30px', textTransform: 'none' }}
              >
                {user.username}
              </Button>
            </Link>
          ) : (
            <Link to="/loginpage" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained" 
                color="primary"
                className="navbar-auth-btn login-btn"
                startIcon={<LoginIcon />}
                sx={{ ml: 2, borderRadius: '30px', textTransform: 'none', backgroundColor: '#fff', color: '#000', '&:hover': {backgroundColor: '#e0e0e0'} }}
              >
                Accedi
              </Button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;