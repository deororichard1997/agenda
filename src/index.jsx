import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/styled-engine'
// import { CssBaseline } from '@mui/material'

ReactDOM.render(
  <StyledEngineProvider injectFirst>
      <BrowserRouter>
          {/* <CssBaseline /> */}
          <App />
      </BrowserRouter>
  </StyledEngineProvider>,
  document.getElementById('root')
)