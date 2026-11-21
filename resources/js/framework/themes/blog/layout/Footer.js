import React from 'react';
import { Footer as WebsiteFooter } from '@ui/components/Footer';

export const Footer = () => (
  <div className="pt-8">
    <WebsiteFooter
      prefix={() => <>Powered by</>}
      suffix={() => <>&copy; {new Date().getFullYear()}</>}
      linkText="Postbox"
      linkURL="https://digitalbit.in"
    />
  </div>
);

export default Footer;
