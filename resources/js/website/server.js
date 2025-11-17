// resources/js/entry-server.jsx
import React from 'react'
import { renderToString } from 'react-dom/server';
import { Provider } from "react-redux";
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import { store, persistor } from "@app/store";
import Web from '@app/web';

export function render() {
    const ComponentToRender = () => <>testing component logic</>;
    const { theme } = setup();
    const html = renderToString(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                    <Web />
            </ThemeProvider>
        </StyledEngineProvider>
    );
    return { html };
}
