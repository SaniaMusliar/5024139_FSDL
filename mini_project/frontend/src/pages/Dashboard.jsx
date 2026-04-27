import React, { useState, useEffect, useCallback } from 'react'
import StatsCard from '../components/StatsCard'
import ItemCard from '../components/ItemCard'
import AddItemModal from '../components/AddItemModal'
import { useAuth } from '../context/AuthContext'
import { getItems, createItem, updateItem, deleteItem } from '../api'
import './Dashboard.css'

const FILTERS = ['All', 'fresh', 'warning', 'critical', 'expired']
const FILTER_LABELS = { All: 'All', fresh: 'Fresh', warning: 'Expiring Soon', critical: 'Critical', expired: 'Expired' }

const Dashboard = ({ setActivePage, activePage, onStatsUpdate }) => {
  const [items, setItems] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [stats, setStats] = useState({ total: 0, expired: 0, fresh: 0, critical: 0, warning: 0, wastePercentage: 0 })
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [savingItem, setSavingItem] = useState(false)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getItems({
        status: filter !== 'All' ? filter : undefined,
        search: search || undefined
      })
      setItems(res.data.items)
      setStats(res.data.stats)
      onStatsUpdate && onStatsUpdate(res.data.stats)
    } catch {
      showToast('Failed to load items.', 'error')
    } finally {
      setLoading(false)
    }
  }, [filter, search, onStatsUpdate])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleAddOrEdit = async (formData) => {
    setSavingItem(true)
    try {
      if (editItem) {
        await updateItem(editItem._id, formData)
        showToast('Item updated successfully!')
      } else {
        await createItem(formData)
        showToast('Item added successfully!')
      }
      setModalOpen(false)
      setEditItem(null)
      if (activePage === 'add') setActivePage('dashboard')
      fetchItems()
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save item.', 'error')
    } finally {
      setSavingItem(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try {
      await deleteItem(id)
      showToast('Item deleted.')
      fetchItems()
    } catch {
      showToast('Failed to delete item.', 'error')
    }
  }

  const handleEdit = (item) => {
    setEditItem(item)
    setModalOpen(true)
  }

  const openAddModal = () => {
    setEditItem(null)
    setModalOpen(true)
  }

  if (activePage === 'profile') return <ProfilePage />
  if (activePage === 'analytics') return <AnalyticsPage stats={stats} items={items} />

  return (
    <div className="dashboard-root">

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
        </div>
      )}

      {/* ===== DASHBOARD PAGE ===== */}
      {activePage === 'dashboard' && (
        <>
          <div className="stats-row fade-in">
            <StatsCard icon="📦" label="Total Items" value={stats.total} description="Across all categories" theme="blue" />
            <StatsCard icon="🚨" label="Expired Items" value={stats.expired} description="Need immediate attention" theme="red" />
            <StatsCard icon="✅" label="Fresh Items" value={stats.fresh} description="Good to go" theme="green" />
            <StatsCard icon="♻️" label="Waste %" value={`${stats.wastePercentage}%`} description="Expired / Total ratio" theme="yellow" />
          </div>

          <div className="summary-bar fade-in">
            <div className="summary-item summary-warning">
              <span>⚠️</span><strong>{stats.warning}</strong><span>expiring in 7 days</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item summary-critical">
              <span>🔴</span><strong>{stats.critical}</strong><span>critical (≤3 days)</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span>📊</span>
              <span>
                {stats.total > 0
                  ? `${((stats.fresh / stats.total) * 100).toFixed(0)}% of your pantry is fresh`
                  : 'No items tracked yet'}
              </span>
            </div>
            <button className="summary-add-btn" onClick={openAddModal}>＋ Add Item</button>
          </div>

          <div className="section-header">
            <div>
              <h2 className="section-title">Recent Items</h2>
              <p className="section-sub">Your latest tracked items at a glance</p>
            </div>
            <button className="btn-see-all" onClick={() => setActivePage('items')}>See all →</button>
          </div>

          {loading ? (
            <div className="items-grid">
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 220 }} />)}
            </div>
          ) : items.length === 0 ? (
            <EmptyState onAdd={openAddModal} />
          ) : (
            <div className="items-grid">
              {items.slice(0, 8).map(item => (
                <ItemCard key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== ALL ITEMS PAGE ===== */}
      {activePage === 'items' && (
        <>
          <div className="items-toolbar fade-in">
            <div className="filter-row">
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`filter-pill ${filter === f ? 'active' : ''} filter-${f}`}
                  onClick={() => setFilter(f)}
                >
                  {FILTER_LABELS[f]}
                  {f !== 'All' && stats[f] > 0 && (
                    <span className="pill-count">{stats[f]}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              <div className="toolbar-search">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                    clearTimeout(window._searchTimer)
                    window._searchTimer = setTimeout(() => {
                      setSearch(e.target.value)
                    }, 400)
                  }}
                />
              </div>
              <button className="btn-add-item" onClick={openAddModal}>＋ Add Item</button>
            </div>
          </div>

          {loading ? (
            <div className="items-grid">
              {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 220 }} />)}
            </div>
          ) : items.length === 0 ? (
            <EmptyState onAdd={openAddModal} filtered={filter !== 'All' || !!search} />
          ) : (
            <>
              <p className="items-count">
                {items.length} item{items.length !== 1 ? 's' : ''} found
              </p>
              <div className="items-grid">
                {items.map(item => (
                  <ItemCard key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* ===== ADD ITEM PAGE (sidebar nav) ===== */}
      {activePage === 'add' && (
        <div className="add-page-wrap fade-in">
          <div className="add-page-card">
            <div className="add-page-header">
              <div className="add-page-icon">➕</div>
              <div>
                <h2>Add New Item</h2>
                <p>Track a new food item in your pantry</p>
              </div>
            </div>
            <AddItemModal
              onClose={() => setActivePage('dashboard')}
              onSubmit={handleAddOrEdit}
              editItem={null}
              loading={savingItem}
              inline={true}
            />
          </div>
        </div>
      )}

      {/* ===== FLOATING MODAL (Add/Edit from cards or + buttons) ===== */}
      {modalOpen && activePage !== 'add' && (
        <AddItemModal
          onClose={() => {
            setModalOpen(false)
            setEditItem(null)
          }}
          onSubmit={handleAddOrEdit}
          editItem={editItem}
          loading={savingItem}
        />
      )}
    </div>
  )
}

// ===== EMPTY STATE =====
const EmptyState = ({ onAdd, filtered }) => (
  <div className="empty-state fade-in">
    <div className="empty-icon">{filtered ? '🔍' : '🛒'}</div>
    <h3>{filtered ? 'No items match your filter' : 'Your pantry is empty'}</h3>
    <p>{filtered ? 'Try changing filters or search terms.' : 'Start tracking your food items to reduce waste.'}</p>
    {!filtered && (
      <button className="btn-add-item" onClick={onAdd}>＋ Add Your First Item</button>
    )}
  </div>
)

// ===== ANALYTICS PAGE =====
const AnalyticsPage = ({ stats, items }) => {
  const categoryMap = {}
  items.forEach(i => {
    categoryMap[i.category] = (categoryMap[i.category] || 0) + 1
  })
  const categories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])
  const maxCat = categories[0]?.[1] || 1

  const score = stats.total === 0
    ? 100
    : Math.round(((stats.fresh + stats.warning * 0.7) / stats.total) * 100)

  const grade = score >= 80
    ? { label: 'Excellent', color: 'var(--green-600)', bg: 'var(--green-50)' }
    : score >= 60
    ? { label: 'Good', color: 'var(--yellow-600)', bg: 'var(--yellow-50)' }
    : { label: 'Needs Attention', color: 'var(--red-600)', bg: 'var(--red-50)' }

  return (
    <div className="analytics-page fade-in">
      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>Waste Overview</h3>
          <div className="waste-gauge-wrap">
            <div className="waste-gauge">
              <svg viewBox="0 0 120 120" width="160" height="160">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--gray-100)" strokeWidth="12" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={
                    stats.wastePercentage > 50 ? 'var(--red-500)'
                    : stats.wastePercentage > 20 ? 'var(--yellow-500)'
                    : 'var(--green-500)'
                  }
                  strokeWidth="12"
                  strokeDasharray={`${(stats.wastePercentage / 100) * 314} 314`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text x="60" y="55" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--gray-900)">
                  {stats.wastePercentage}%
                </text>
                <text x="60" y="72" textAnchor="middle" fontSize="9" fill="var(--gray-400)">
                  WASTE RATE
                </text>
              </svg>
            </div>
            <div className="waste-legend">
              {[
                { label: 'Fresh', value: stats.fresh, color: 'var(--green-500)' },
                { label: 'Warning', value: stats.warning, color: 'var(--yellow-500)' },
                { label: 'Critical', value: stats.critical, color: 'var(--orange-500)' },
                { label: 'Expired', value: stats.expired, color: 'var(--red-500)' },
              ].map(({ label, value, color }) => (
                <div key={label} className="legend-row">
                  <span className="legend-dot" style={{ background: color }} />
                  <span className="legend-label">{label}</span>
                  <span className="legend-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>Items by Category</h3>
          {categories.length === 0 ? (
            <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem', marginTop: 16 }}>No items to show.</p>
          ) : (
            <div className="category-bars">
              {categories.map(([cat, count]) => (
                <div key={cat} className="cat-row">
                  <span className="cat-name">{cat}</span>
                  <div className="cat-bar-wrap">
                    <div className="cat-bar" style={{ width: `${(count / maxCat) * 100}%` }} />
                  </div>
                  <span className="cat-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="analytics-card analytics-card-wide">
          <h3>Pantry Health Score</h3>
          <div className="health-score-wrap">
            <div className="health-score" style={{ background: grade.bg }}>
              <span className="health-score-num" style={{ color: grade.color }}>{score}</span>
              <span className="health-score-label" style={{ color: grade.color }}>{grade.label}</span>
              <p className="health-score-desc">
                {score >= 80
                  ? 'Great job! Most of your food is fresh and well-managed.'
                  : score >= 60
                  ? 'Not bad, but some items need your attention soon.'
                  : 'Several items have expired. Time to clean out the pantry!'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ===== PROFILE PAGE =====
const ProfilePage = () => {
  const { user } = useAuth()
  return (
    <div className="profile-page fade-in">
      <div className="profile-card">
        <div className="profile-avatar-lg">{user?.name?.charAt(0).toUpperCase()}</div>
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>
        <div className="profile-meta">
          <div className="profile-meta-item">
            <span>📅</span>
            <span>
              Joined {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
        <div className="profile-badge">
          <span>🏆</span> Food Guardian
        </div>
      </div>
    </div>
  )
}

export default Dashboard
