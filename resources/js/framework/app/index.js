import * as React from "react";
import {createRoot} from "react-dom/client";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import Engine from "@app/engine";

if (document.getElementById("app")) {
    const { theme } = setup();
    const app = createRoot(document.getElementById("app"));
    app.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Engine />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
