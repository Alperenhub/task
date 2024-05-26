// Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        paddingTop: '16px',
        paddingBottom: '16px',
        position: 'relative',
        bottom: 0,
        left: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Footer 
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          This is dashboard footer example.
        </Typography>
        <Box sx={{ textAlign: 'center', marginTop: '8px' }}>
          <Link href="#" color="inherit" underline="none">
            Link 1
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="none">
            Link 2
          </Link>{' '}
          |{' '}
          <Link href="#" color="inherit" underline="none">
            Link 3
          </Link>
        </Box>
        <Typography variant="body2" color="inherit" align="center" sx={{ marginTop: '16px' }}>
          {'© '}
          <Link color="inherit" href="#">
            furkanalperenkilinc.com
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
