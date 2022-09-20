import React from 'react';
// elements
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// footer
import WebsiteFooter from '../elements/WebsiteFooter';
// theme for the frontend
import Theme from '../../../website/Theme';

export default function Website(props) {
    return (
        <div className="theme-root">
            <CssBaseline />
            <Theme {...props} />
            <Box pt={4}>
                <WebsiteFooter />
            </Box>
        </div>
    );
}
