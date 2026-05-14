import React from 'react';
import Box from '@mui/material/Box';
import { Footer as WebsiteFooter } from '@ui/components/Footer';

export const Footer = () => (
  <Box pt={4}>
    <WebsiteFooter
      prefix={() => <>Powered by</>}
      suffix={() => <>&copy; {new Date().getFullYear()}</>}
      linkText="Postbox"
      linkURL="https://digitalbit.in"
    />
  </Box>
);

export default Footer;
