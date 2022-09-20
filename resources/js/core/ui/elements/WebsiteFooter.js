import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function WebsiteFooter () {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Powered by '}
            <Link color="inherit" href="https://digitalbit.in" underline="hover">
                {'Postbox'}
            </Link>
            {' © '}
            {new Date().getFullYear()}
        </Typography>
    );
}
