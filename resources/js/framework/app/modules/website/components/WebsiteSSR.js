import React from 'react';
import { useSelector } from 'react-redux';

// Static import for server-side rendering
import BlogTheme from '@themes/blog/index.js';

const themeComponents = {
  blog: BlogTheme,
};

export const WebsiteSSR = () => {
  const theme = useSelector((state) => state.site.theme);
  const ThemeComponent = themeComponents[theme] || themeComponents.blog;

  return <ThemeComponent />;
};

export default WebsiteSSR;