import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue, purple, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const primary = blue[400]; // #f44336

const Error403page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        403
      </Typography>
      <Typography  variant="h6" style={{ color: 'white' }}>
        Bạn không có quyền truy cập vào trang này.
      </Typography>
      <Button className='tw-my-4' variant="contained" >
      <Link to="/" className='tw-no-underline tw-text-white'>Về trang chủ</Link>
      </Button>
    </Box>
  );
}

export default Error403page;