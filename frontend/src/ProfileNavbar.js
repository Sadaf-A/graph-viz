import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from './public/logo.png'; 

const Navbar = () => {
  const navigate = useNavigate();

  const handleMyGraphs = () => {
    navigate('/mygraphs');
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 40, marginRight: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            graph-viz
          </Typography>
        </div>
        <div>
          <Button
            color="inherit"
            component={NavLink}
            to="/profile"
            sx={{
              width: '120px',
              marginRight: 2,
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleMyGraphs}
            sx={{
              width: '120px',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            MyGraphs
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              width: '120px',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
