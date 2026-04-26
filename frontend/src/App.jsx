import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import AuthPage from './pages/AuthPage'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import './App.css'

const App = () => {
  const { user, loading } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')
  const [itemStats, setItemStats] = useState({})

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-inner">
          <div className="loading-logo">🛡️</div>
          <p>Loading ExpiryGuard...</p>
          <div className="loading-bar"><div className="loading-bar-fill" /></div>
        </div>
      </div>
    )
  }

  if (!user) return <AuthPage />

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="app-main">
        <Topbar activePage={activePage} itemStats={itemStats} />
        <main className="app-content">
          <Dashboard
            activePage={activePage}
            setActivePage={setActivePage}
            onStatsUpdate={setItemStats}
          />
        </main>
      </div>
    </div>
  )
}

export default App
