import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { useState, useEffect } from 'react';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3A80A',
      light: '#FEF9EE',
    },
    secondary: {
      main: '#555555',
    },
  }
});

function App() {
  const {setBasket} = useStoreContext();
  const[loading, setLoading] = useState(true);
  
  useEffect(() => {
    const userId = getCookie('userId');
    if (userId) {
      agent.Basket.get()
        .then(response => setBasket(response))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  },[setBasket])

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
