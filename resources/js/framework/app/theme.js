import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
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
        fontWeightMedium: 500
    },
    palette: {
        mode: 'light',
        primary: {
            main: 'rgba(0, 45, 99, 0.8)',
        },
        plain: {
            main: '#fff'
        },
        breadcrumb: {
            main: '#281850'
        },
    }
});
