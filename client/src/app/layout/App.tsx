import Gallery from '../../features/catalog/Gallery';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

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
      <CssBaseline />
      
      <Outlet />
    </ThemeProvider>
  )
}

export default App
