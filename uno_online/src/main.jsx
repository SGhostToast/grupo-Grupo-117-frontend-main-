import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './routes/common/header'
import Footer from './routes/common/footer'
import './index.css'
import Routing from './routes/common/Routing'
import './routes/common/styles/general.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <div className="page">
      <Routing />
    </div>
    <Footer />
  </React.StrictMode>,
)
