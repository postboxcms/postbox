import React from 'react';
import { Body, Header, Footer } from './layout';

const Blog = () => {
  React.useEffect(()=> {
    console.log('blog theme loaded');
  },[]);
  return (
    <div className="web-root">
      <div>
        <Header />
        <Body />
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Blog;
