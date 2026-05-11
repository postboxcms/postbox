import React from 'react';
import {Typography, Link} from '@mui/material';
import {useWebCSS} from '@ui/hooks/css';

export const Footer = ({prefix, suffix, linkText, linkURL}) => {
    const classes = useWebCSS();
    const Prefix = prefix;
    const Suffix = suffix;
    
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {/* {'Powered by '} */}
            <Prefix /> {" "}
            <Link className={classes.footerLink} href={linkURL} underline="hover">
                {/* {'Postbox'} */}
                {linkText || 'Postbox'}
            </Link>{" "}
            {/* {' © '}
            {new Date().getFullYear()} */}
            <Suffix />
        </Typography>
    );
}

export default Footer;