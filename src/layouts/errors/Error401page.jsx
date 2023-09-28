import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue, purple, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const primary = purple[400]; // #f44336

const Error401page = () => {
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
        401
      </Typography>
      <Typography variant="h2" style={{ color: 'white', fontFamily: "Open Sans" }}>
            UNAUTHORIZE
      </Typography>
      <Typography  variant="h6" style={{ color: 'white' }}>
       Vui lòng đăng nhập để tiếp tục.
      </Typography>
      <Button className='tw-my-4' variant="contained" >
      <Link to="/login" className='tw-no-underline tw-text-white'>Đăng nhập</Link>
      </Button>
    </Box>
  );
}

export default Error401page;