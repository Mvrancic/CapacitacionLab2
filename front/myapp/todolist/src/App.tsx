import React from 'react';
import List from './List';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          To-Do List
        </Typography>
        <List />
      </Container>
  );
};

export default App;
