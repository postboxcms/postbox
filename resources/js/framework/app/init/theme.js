import { createTheme } from "@mui/material/styles";
import { darken, lighten } from "@app/utils/colors";

const baseConfig = require("@resources/config/colors");
const frameworkColor = baseConfig.css.frameworkColor;
const brandColor = baseConfig.css.brandColor;

export const admin = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "Inter",
            "-apple-system",
            "Ubuntu",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 13,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    palette: {
        mode: "light",
        primary: {
            main: frameworkColor,
            dark: darken(frameworkColor, 20),
            light: lighten(frameworkColor, 20),
        },
        plain: {
            main: "#fff",
        },
        breadcrumb: {
            main: "#281850",
            hover: "rgb(227, 217, 255)",
        },
        element: {
            border: "#ccc",
        },
    },
});

export const website = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "Inter",
            "-apple-system",
            "Ubuntu",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 13,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    palette: {
        mode: "light",
        primary: {
            main: brandColor,
            dark: darken(brandColor, 20),
            light: lighten(brandColor, 20),
        },
        plain: {
            main: "#fff",
        },
        breadcrumb: {
            main: "#281850",
        },
        element: {
            border: "#ccc",
        },
    },
});
