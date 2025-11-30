import React from 'react';
// elements
import CssBaseline from '@mui/material/CssBaseline';

export default function Website(props) {
    const renderTheme = (props) => {
        const ThemeComponent = props.controller;
        return (
            <ThemeComponent {...props} />
        );
    };

    return (
        <div className="web-root">
            <CssBaseline />
            {renderTheme(props)}
            {/* <Box pt={4}>
                <Footer prefix={() => <>Powered by</>} suffix={() => <>&copy; {new Date().getFullYear()}</>} linkText="Postbox" linkURL="https://digitalbit.in" />
            </Box> */}
        </div>
    );
}
