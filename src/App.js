import React from 'react';
import { Container, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        College Dashboard
      </Typography>
      <Dashboard />
    </Container>
  );
};

export default App;

