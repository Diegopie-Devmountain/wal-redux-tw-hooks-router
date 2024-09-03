import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import { Provider } from 'react-redux';
import globalStore from './store/store.js';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={globalStore} >
      <Router />
    </Provider>
  </StrictMode>,
)
