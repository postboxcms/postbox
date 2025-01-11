import * as React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { setup } from "@app/init";
import Engine from "@app/engine";

if (document.getElementById("app")) {
    const { theme } = setup();
    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Engine />
            </ThemeProvider>
        </StyledEngineProvider>,
        document.getElementById("app")
    );
}
