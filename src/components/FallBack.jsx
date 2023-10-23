import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const FallBack = ({ error, resetErrorBoundary }) => {
  return (
    <Box role="alert">
      <Typography variant="subtitle1">Something went wrong:</Typography>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </Box>
  );
};

export default FallBack;
