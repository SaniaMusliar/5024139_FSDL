import React from 'react'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'items', label: 'All Items', icon: '⊞' },
  { id: 'add', label: 'Add Item', icon: '⊕' },
  { id: 'analytics', label: 'Analytics', icon: '◎' },
  { id: 'profile', label: 'Profile', icon: '○' },
]

const Sidebar = ({ activePage, setActivePage }) => {
  const { logout, user } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🛡️</div>
        <div>
          <span className="sidebar-logo-name">ExpiryGuard</span>
          <span className="sidebar-logo-tagline">Food Tracker</span>
        </div>
      </div>

      <div className="sidebar-section-label">MAIN MENU</div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {activePage === item.id && <span className="nav-active-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name}</span>
            <span className="sidebar-user-email">{user?.email}</span>
          </div>
        </div>
        <button className="sidebar-logout" onClick={logout}>
          <span>⏻</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
