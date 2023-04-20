import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './common/App'
import Header from './common/header'
import Footer from './common/footer'
import './index.css'
import Routing from './common/Routing'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Routing />
    <Footer />
  </React.StrictMode>,
)
