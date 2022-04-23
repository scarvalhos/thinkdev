import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@material-ui/core'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <CssBaseline />
      <App />
  </React.StrictMode>
)
