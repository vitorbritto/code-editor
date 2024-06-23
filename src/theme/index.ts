import { createTheme } from '@mui/material/styles'
import { lightGreen, grey, red, orange } from '@mui/material/colors'
import '@fontsource/montserrat'

export const theme = createTheme({
  palette: {
    primary: {
      main: orange['A700']
    },
    secondary: {
      main: lightGreen['A700']
    },
    text: {
      primary: grey[100],
      secondary: grey[500]
    },
    background: {
      default: '#0f0a15',
      paper: '#181e2e'
    },
    divider: grey[500],
    success: {
      main: lightGreen['A700']
    },
    error: {
      main: red[700]
    },
    warning: {
      main: orange[700]
    },
    info: {
      main: '#0f0aaa'
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 12
  }
})
