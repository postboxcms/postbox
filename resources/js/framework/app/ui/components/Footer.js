import React from 'react';
import {Typography, Link} from '@mui/material';
import {useCSS} from '@app/hooks/css';

const Footer = ({prefix, suffix, linkText, linkURL}) => {
    const classes = useCSS();

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {/* {'Powered by '} */}
            {prefix} {" "}
            <Link className={classes.footerLink} href={linkURL} underline="hover">
                {/* {'Postbox'} */}
                {linkText}
            </Link>{" "}
            {/* {' © '}
            {new Date().getFullYear()} */}
            {suffix}
        </Typography>
    );
}

export default Footer;