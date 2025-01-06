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
            main: 'rgba(0, 16, 46, 0.9)',
            dark: 'rgba(0, 16, 46, 1)'
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
