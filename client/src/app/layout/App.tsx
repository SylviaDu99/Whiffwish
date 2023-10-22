import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F3A80A',
      light: '#FEF9EE',
    },
    secondary: {
      main: '#000000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
