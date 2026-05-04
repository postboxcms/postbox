import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import Web from '@app/web';
import WebSSR from '@app/web-ssr';

const el = document.getElementById('web');
const { theme } = setup();

if (el.hasChildNodes()) {
    hydrateRoot(el,
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <WebSSR />
            </ThemeProvider>
        </StyledEngineProvider>
    );
} else {
    createRoot(el).render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Web />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}