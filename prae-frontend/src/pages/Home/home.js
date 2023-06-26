import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Container, Paper } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const CACHE_CURRENT_USER = "@current-User";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem(CACHE_CURRENT_USER));

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <Box sx={{ my: 4 }}>
          <BookIcon sx={{ fontSize: 70, color: 'primary.main', mx: 'auto' }} />
          <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
            Bem-vindo à PRAE
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary', fontSize: '1.0rem' }}>
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
            {user.username}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            Esse e um sistema de troca de livros!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
