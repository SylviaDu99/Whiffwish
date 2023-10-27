import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3A80A',
      light: '#FEF9EE',
    },
    secondary: {
      main: '#555555',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}

export default App
