import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Open Sans',
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
        fontSize: 12,
        fontWeightLight: 300,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
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
