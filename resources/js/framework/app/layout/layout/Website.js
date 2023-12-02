import React from 'react';
// elements
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// footer
import WebsiteFooter from '../elements/WebsiteFooter';

export default function Website(props) {
    const renderTheme = (props) => {
        const ThemeComponent = props.controller;
        return (
            <ThemeComponent {...props} />
        );
    };

    return (
        <div className="theme-root">
            <CssBaseline />
            {renderTheme(props)}
            <Box pt={4}>
                <WebsiteFooter />
            </Box>
        </div>
    );
}
