import React from 'react';
import {Typography, Link} from '@mui/material';

export default function Footer ({prefix, suffix, linkText, linkURL}) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {/* {'Powered by '} */}
            {prefix} {" "}
            <Link color="inherit" href={linkURL} underline="hover">
                {/* {'Postbox'} */}
                <b>{linkText}</b>
            </Link>{" "}
            {/* {' © '}
            {new Date().getFullYear()} */}
            {suffix}
        </Typography>
    );
}
