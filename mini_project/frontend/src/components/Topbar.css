.topbar {
  height: var(--topbar-height);
  background: white;
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.topbar-left { flex: 1; }

.topbar-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--gray-900);
  letter-spacing: -0.4px;
  line-height: 1.2;
}

.topbar-subtitle {
  font-size: 0.78rem;
  color: var(--gray-400);
  margin-top: 2px;
  font-weight: 400;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Search bar */
.topbar-search {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 18px;
  color: var(--gray-400);
  pointer-events: none;
}

.topbar-search input {
  padding: 8px 14px 8px 36px;
  background: var(--gray-100);
  border: 1.5px solid transparent;
  border-radius: var(--radius-full);
  font-size: 0.83rem;
  color: var(--gray-600);
  width: 200px;
  transition: var(--transition);
  cursor: pointer;
}

.topbar-search input:focus {
  background: white;
  border-color: var(--green-300);
  outline: none;
  width: 240px;
}

.topbar-search input::placeholder { color: var(--gray-400); }

/* Icon button */
.topbar-icon-btn {
  width: 40px; height: 40px;
  border-radius: var(--radius);
  background: var(--gray-100);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  transition: var(--transition);
  position: relative;
  border: 1px solid transparent;
}

.topbar-icon-btn:hover {
  background: var(--green-50);
  border-color: var(--green-200);
}

.icon-bell { font-size: 16px; }

.notif-badge {
  position: absolute;
  top: -4px; right: -4px;
  width: 18px; height: 18px;
  background: var(--red-500);
  color: white;
  border-radius: 50%;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid white;
}

/* Notification wrap */
.topbar-notif-wrap { position: relative; }

.notif-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 300px;
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--gray-100);
  overflow: hidden;
  animation: fadeIn 0.2s ease;
  z-index: 200;
}

.notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--gray-100);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gray-800);
}

.notif-count {
  background: var(--red-500);
  color: white;
  border-radius: var(--radius-full);
  padding: 2px 8px;
  font-size: 0.7rem;
  font-weight: 700;
}

.notif-empty {
  padding: 28px 16px;
  text-align: center;
  color: var(--gray-500);
  font-size: 0.84rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.notif-empty span { font-size: 28px; }

.notif-list { padding: 8px; }

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius);
  margin-bottom: 4px;
  font-size: 0.82rem;
}

.notif-expired { background: var(--red-50); }
.notif-critical { background: var(--orange-50); }

.notif-item span { font-size: 20px; margin-top: 2px; }

.notif-item strong {
  display: block;
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: 2px;
}

.notif-item p { color: var(--gray-500); }

/* Profile */
.topbar-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
}

.topbar-profile:hover {
  background: var(--gray-50);
  border-color: var(--gray-200);
}

.topbar-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--green-500), var(--green-700));
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  flex-shrink: 0;
}

.topbar-name {
  display: block;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--gray-800);
  line-height: 1.2;
}

.topbar-role {
  display: block;
  font-size: 0.7rem;
  color: var(--gray-400);
}

@media (max-width: 900px) {
  .topbar-search { display: none; }
  .topbar-profile-info { display: none; }
  .topbar { padding: 0 16px; }
}
