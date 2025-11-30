import * as React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import Engine from "@app/engine";
import Web from "@app/web";

const appRoot = document.getElementById("app");
const webRoot = document.getElementById("web");

if (appRoot) {
    const { theme } = setup();
    const app = createRoot(appRoot);
    app.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Engine />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

if (webRoot) {
    const { theme } = setup();
    const web = createRoot(webRoot);
    web.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Web />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
