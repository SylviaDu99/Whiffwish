import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { setCart } from '../../features/cart/cartSlice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FDC54E',
      light: '#FEF9EE',
    },
    secondary: {
      main: '#555555',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  }
});

function App() {
  const dispatch = useAppDispatch();
  const[loading, setLoading] = useState(true);
  
  useEffect(() => {
    const userId = getCookie('userId');
    if (userId) {
      agent.Cart.get()
        .then(response => dispatch(setCart(response)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  },[setCart])

  if (loading) return <LoadingComponent message="Initializing..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  )
}

export default App
