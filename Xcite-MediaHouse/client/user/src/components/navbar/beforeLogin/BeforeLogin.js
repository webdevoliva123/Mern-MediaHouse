import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

function BeforeLogin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background: '#111'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: "2px" }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color:"var(--white)"}}>
            <Link to="/">MediaHouse</Link>
          </Typography>
          <Link to={"/signIn"}><Button style={{marginRight:"20px",color:"var(--white)"}}>Login</Button></Link>
          <Link to={"/signUp"}><Button style={{background: '#dc143c',color:"var(--white)"}}  variant="contained" color="warning">SignUp</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default BeforeLogin
