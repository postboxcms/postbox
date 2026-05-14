import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Body, Header, Footer } from './layout';

const Blog = () => {
  React.useEffect(()=> {
    console.log('blog theme loaded');
  },[]);
  return (
    <div className="web-root">
      <CssBaseline /> 
      <Box>
        <Header />
        <Body />
        {/* <Footer /> */}
      </Box>
    </div>
  );
};

export default Blog;
