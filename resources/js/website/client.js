import React from 'react';
import { Provider } from "react-redux";
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import { store, persistor } from "@app/store";
import Web from '@app/web';

const el = document.getElementById('web');
const { theme } = setup();

if (el.hasChildNodes()) {
    hydrateRoot(el,
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Web />
                </Provider>
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