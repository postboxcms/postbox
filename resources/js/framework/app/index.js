import * as React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Template from "./template";
import { setup } from "./setup";

if (document.getElementById("app")) {
    setup();
    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Template />
            </ThemeProvider>
        </StyledEngineProvider>,
        document.getElementById("app")
    );
}
