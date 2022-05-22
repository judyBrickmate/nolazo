import { Box } from '@mui/material';
import React from 'react';

export default function PageNotFound() {
  return (
    <Box
      style={{
        display: 'flex',
        height: '300px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      잘못된 페이지 접근입니다.
    </Box>
  );
}
