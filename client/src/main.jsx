import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserState } from './context/UserContext.jsx'
import { SocketState } from './context/SocketContext.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserState>
      <App />
    </UserState>
  </React.StrictMode>,
)
