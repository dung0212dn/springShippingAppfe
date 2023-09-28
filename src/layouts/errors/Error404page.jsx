import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue, purple, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const primary = red[400]; // #f44336

const Error404page = () => {
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
        404
      </Typography>
      <Typography  variant="h6" style={{ color: 'white' }}>
        Ôi không! Trang bạn tìm kiếm không tồn tại rồi.
      </Typography>
      <Button className='tw-my-4' variant="contained" >
      <Link to="/" className='tw-no-underline tw-text-white'>Về trang chủ</Link>
      </Button>
    </Box>
  );
}

export default Error404page;