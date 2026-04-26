# 🛡️ ExpiryGuard – Food Expiry Tracker (Vite Version)

Works perfectly with Node v24 ✅ No OpenSSL issues.

---

## 🚀 Quick Start

### Step 1 — Backend
```bash
cd expiryguard/backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### Step 2 — Frontend
```bash
cd expiryguard/frontend
npm install
npm start
# Runs on http://localhost:3000
# Browser opens automatically!
```

That's it. No extra flags, no workarounds needed.

---

## ⚙️ MongoDB Setup

**Local:** Make sure MongoDB is running
```powershell
net start MongoDB
```

**Atlas (recommended):** Paste connection string in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/expiryguard
```

---

## ✅ Verify Data in MongoDB

**MongoDB Compass:** Connect to `mongodb://localhost:27017` → database `expiryguard`

**mongosh:**
```bash
mongosh
use expiryguard
db.users.find().pretty()
db.items.find().pretty()
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 5000 in use | Change `PORT=5001` in `backend/.env` and update `target` in `vite.config.js` |
| "Something went wrong" on signup | Start the backend first |
| MongoDB error | Run `net start MongoDB` or use Atlas URI |
