import React from 'react'
import './ItemCard.css'

const CATEGORY_EMOJIS = {
  Dairy: '🥛', Meat: '🥩', Vegetables: '🥦', Fruits: '🍎',
  Grains: '🌾', Beverages: '🥤', Snacks: '🍿', Frozen: '🧊',
  Condiments: '🫙', General: '📦',
}

const ITEM_NAME_EMOJIS = {
  milk: '🥛', bread: '🍞', egg: '🥚', eggs: '🥚', butter: '🧈',
  cheese: '🧀', chicken: '🍗', beef: '🥩', fish: '🐟', salmon: '🐟',
  apple: '🍎', banana: '🍌', orange: '🍊', mango: '🥭', tomato: '🍅',
  potato: '🥔', onion: '🧅', carrot: '🥕', spinach: '🥬', lettuce: '🥬',
  rice: '🍚', pasta: '🍝', yogurt: '🥛', juice: '🧃', water: '💧',
  coffee: '☕', tea: '🍵', chocolate: '🍫', cake: '🎂', pizza: '🍕',
  corn: '🌽', broccoli: '🥦', avocado: '🥑', lemon: '🍋', grape: '🍇',
  strawberry: '🍓', blueberry: '🫐', mushroom: '🍄', pepper: '🌶️',
}

const getItemEmoji = (name, category) => {
  const lower = name.toLowerCase()
  for (const [key, emoji] of Object.entries(ITEM_NAME_EMOJIS)) {
    if (lower.includes(key)) return emoji
  }
  return CATEGORY_EMOJIS[category] || '📦'
}

const STATUS_CONFIG = {
  fresh: { label: 'Fresh', className: 'badge-fresh' },
  warning: { label: 'Expiring Soon', className: 'badge-warning' },
  critical: { label: 'Critical', className: 'badge-critical' },
  expired: { label: 'Expired', className: 'badge-expired' },
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

const getDaysText = (days) => {
  if (days < 0) return `${Math.abs(days)}d ago`
  if (days === 0) return 'Today!'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

const ItemCard = ({ item, onEdit, onDelete }) => {
  const emoji = getItemEmoji(item.name, item.category)
  const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.fresh
  const daysText = getDaysText(item.daysUntilExpiry)

  return (
    <div className={`item-card item-card--${item.status}`}>
      <div className="item-card-header">
        <div className={`item-emoji-wrap item-emoji--${item.status}`}>
          <span className="item-emoji">{emoji}</span>
        </div>
        <span className={`item-badge ${statusCfg.className}`}>{statusCfg.label}</span>
      </div>

      <div className="item-card-body">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-category">{item.category}</span>
        <div className="item-meta">
          <div className="item-meta-row">
            <span className="meta-icon">📦</span>
            <span className="meta-label">Quantity</span>
            <span className="meta-value">{item.quantity} {item.unit}</span>
          </div>
          <div className="item-meta-row">
            <span className="meta-icon">📅</span>
            <span className="meta-label">Expires</span>
            <span className="meta-value">{formatDate(item.expiryDate)}</span>
          </div>
          <div className={`item-days-row item-days--${item.status}`}>
            <span className="days-dot" />
            <span className="days-text">{daysText}</span>
          </div>
        </div>
      </div>

      <div className="item-card-actions">
        <button className="action-btn action-edit" onClick={() => onEdit(item)}>✏️ Edit</button>
        <button className="action-btn action-delete" onClick={() => onDelete(item._id)}>🗑️ Delete</button>
      </div>
    </div>
  )
}

export default ItemCard
