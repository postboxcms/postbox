import { createTheme } from '@mui/material/styles';

export const admin = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Inter',
            '-apple-system',
            'Ubuntu',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 13,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    },
    palette: {
        mode: 'light',
        primary: {
            main: 'rgba(73, 38, 166, 1)',
            dark: 'rgb(55, 30, 124)'
        },
        plain: {
            main: '#fff'
        },
        breadcrumb: {
            main: '#281850'
        },
        element: {
            border: '#ccc'
        }
    }
});

export const website = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Inter',
            '-apple-system',
            'Ubuntu',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: 13,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700
    },
    palette: {
        mode: 'light',
        primary: {
            main: 'rgb(21, 54, 118)',
            dark: 'rgb(14, 36, 78)'
        },
        plain: {
            main: '#fff'
        },
        breadcrumb: {
            main: '#281850'
        },
        element: {
            border: '#ccc'
        }
    }
});
