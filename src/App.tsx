import { BrowserRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import { injectStyle } from "react-toastify/dist/inject-style";

import { CssBaseline } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext'
import { PostsProvider } from './contexts/PostsContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Routes from './routes'

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
          <CssBaseline />
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
