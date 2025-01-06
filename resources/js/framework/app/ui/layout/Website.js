import React from 'react';
// elements
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// footer
import Footer from '@ui/components/Footer';

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
                <Footer prefix="Powered by" suffix={' © ' + new Date().getFullYear()} linkText="Postbox" linkURL="https://digitalbit.in" />
            </Box>
        </div>
    );
}
