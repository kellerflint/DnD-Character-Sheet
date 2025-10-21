import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c5b358',
      contrastText: '#1a1a1a', 
    },
    background: {
      default: '#1a1a1a', 
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#808080ff',
    },
  },
  typography: {
    fontFamily: '"Garamond", serif',
    h6: {
      fontWeight: 700,
      color: '#c5b358', 
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a', 
        },
      },
    },
    MuiButton: {
        styleOverrides: {
          outlined: {
            borderColor: '#c5b358',
            color: '#c5b358',
            '&:hover': {
              borderColor: '#ffd500ff',
              color: '#ffd500ff',
              backgroundColor: 'rgba(197, 179, 88, 0.1)',
            },
          },
        },
    },
  }
});

export default theme;