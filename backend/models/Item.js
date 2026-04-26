const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unit: {
    type: String,
    default: 'pcs',
    enum: ['pcs', 'kg', 'g', 'L', 'ml', 'pack', 'box', 'bottle', 'can']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  category: {
    type: String,
    default: 'General',
    enum: ['Dairy', 'Meat', 'Vegetables', 'Fruits', 'Grains', 'Beverages', 'Snacks', 'Frozen', 'Condiments', 'General']
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });

itemSchema.virtual('status').get(function() {
  const now = new Date();
  const expiry = new Date(this.expiryDate);
  const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'expired';
  if (diffDays <= 3) return 'critical';
  if (diffDays <= 7) return 'warning';
  return 'fresh';
});

itemSchema.virtual('daysUntilExpiry').get(function() {
  const now = new Date();
  const expiry = new Date(this.expiryDate);
  return Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
});

itemSchema.set('toJSON', { virtuals: true });
itemSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Item', itemSchema);
