import React from 'react'
import './StatsCard.css'

const StatsCard = ({ icon, label, value, description, theme, trend }) => {
  return (
    <div className={`stats-card stats-card--${theme}`}>
      <div className="stats-card-top">
        <div className={`stats-icon stats-icon--${theme}`}>{icon}</div>
        {trend !== undefined && (
          <div className={`stats-trend ${trend >= 0 ? 'trend-up' : 'trend-down'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="stats-card-body">
        <span className="stats-value">{value}</span>
        <span className="stats-label">{label}</span>
        {description && <span className="stats-desc">{description}</span>}
      </div>
      <div className={`stats-card-bar stats-card-bar--${theme}`} />
    </div>
  )
}

export default StatsCard
