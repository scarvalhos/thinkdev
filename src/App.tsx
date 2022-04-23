import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { injectStyle } from "react-toastify/dist/inject-style";
import { ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './contexts/AuthContext'
import Routes from './routes'

import theme from './styles/global';
import { PostsProvider } from './contexts/PostsContext';

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <PostsProvider>
            <Routes />
            <ToastContainer autoClose={3000} />
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
