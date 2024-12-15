import * as React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup, theme } from "@app/init";
import Engine from "@app/engine";

if (document.getElementById("app")) {
    setup();
    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Engine />
            </ThemeProvider>
        </StyledEngineProvider>,
        document.getElementById("app")
    );
}
