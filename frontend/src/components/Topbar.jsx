import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Topbar.css'

const PAGE_META = {
  dashboard: { title: 'Dashboard', subtitle: "Welcome back! Here's what's happening with your pantry." },
  items: { title: 'All Items', subtitle: 'Browse and manage all your tracked food items.' },
  add: { title: 'Add Item', subtitle: 'Add a new item to start tracking its expiry.' },
  analytics: { title: 'Analytics', subtitle: 'Deep dive into your waste metrics and trends.' },
  profile: { title: 'Profile', subtitle: 'Manage your account settings and preferences.' },
}

const Topbar = ({ activePage, itemStats }) => {
  const { user } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)
  const meta = PAGE_META[activePage] || PAGE_META.dashboard
  const criticalCount = itemStats?.critical || 0
  const totalNotifs = criticalCount + (itemStats?.expired || 0)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{meta.title}</h1>
        <p className="topbar-subtitle">{meta.subtitle}</p>
      </div>

      <div className="topbar-right">

        <div className="topbar-notif-wrap">
          <button className="topbar-icon-btn" onClick={() => setNotifOpen(p => !p)}>
            <span className="icon-bell">🔔</span>
            {totalNotifs > 0 && <span className="notif-badge">{totalNotifs > 9 ? '9+' : totalNotifs}</span>}
          </button>

          {notifOpen && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                {totalNotifs > 0 && <span className="notif-count">{totalNotifs}</span>}
              </div>
              {totalNotifs === 0 ? (
                <div className="notif-empty"><span>✅</span><p>All items are fresh!</p></div>
              ) : (
                <div className="notif-list">
                  {itemStats?.expired > 0 && (
                    <div className="notif-item notif-expired">
                      <span>🚨</span>
                      <div>
                        <strong>{itemStats.expired} item{itemStats.expired > 1 ? 's' : ''} expired</strong>
                        <p>Remove or replace these items soon.</p>
                      </div>
                    </div>
                  )}
                  {criticalCount > 0 && (
                    <div className="notif-item notif-critical">
                      <span>⚠️</span>
                      <div>
                        <strong>{criticalCount} expiring in 3 days</strong>
                        <p>Use these items before they go bad.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="topbar-profile">
          <div className="topbar-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="topbar-profile-info">
            <span className="topbar-name">{user?.name}</span>
            <span className="topbar-role">Food Manager</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
