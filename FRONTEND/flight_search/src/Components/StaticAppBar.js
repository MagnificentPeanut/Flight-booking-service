import * as React from 'react'
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

export default function StaticAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='transparent'>
        <Toolbar>
          <Tooltip title='Home'>
            <IconButton
              size="large"
              href='/'
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 10, mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Typography fontFamily='Poppins' fontWeight={600} variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Generic Airlines
          </Typography>
          <Button sx={{ fontFamily: 'Poppins' }} size='large' href='/about' color="inherit">About us</Button>
          <Button sx={{ fontFamily: 'Poppins' }} size='large' href='/register' color="inherit">Sign Up</Button>
          <Button sx={{ fontFamily: 'Poppins', mr: 10 }} size='large' href='/login' color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
