import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './common/header'
import Footer from './common/footer'
import './index.css'
import Routing from './common/Routing'
import './common/styles/general.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <div className="page">
      <Routing />
    </div>
    <Footer />
  </React.StrictMode>,
)
