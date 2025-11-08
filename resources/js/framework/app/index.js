import * as React from "react";
import {createRoot} from "react-dom/client";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import Engine from "@app/engine";

const appRoot = document.getElementById("app");

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
