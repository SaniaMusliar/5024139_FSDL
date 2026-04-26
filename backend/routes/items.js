const express = require('express');
const Item = require('../models/Item');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// GET /api/items
router.get('/', async (req, res) => {
  try {
    const { category, status, search } = req.query;

    // Always fetch ALL user items for accurate stats
    const allItems = await Item.find({ user: req.user._id }).sort({ expiryDate: 1 });

    // Calculate stats from ALL items (never filtered)
    const total = allItems.length;
    const expired = allItems.filter(i => i.status === 'expired').length;
    const fresh = allItems.filter(i => i.status === 'fresh').length;
    const critical = allItems.filter(i => i.status === 'critical').length;
    const warning = allItems.filter(i => i.status === 'warning').length;
    const wastePercentage = total > 0 ? ((expired / total) * 100).toFixed(1) : 0;

    // Now apply filters for the items list only
    let filteredItems = allItems;

    if (search) {
      filteredItems = filteredItems.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== 'All') {
      filteredItems = filteredItems.filter(i => i.category === category);
    }

    if (status && status !== 'All') {
      filteredItems = filteredItems.filter(i => i.status === status.toLowerCase());
    }

    res.json({
      success: true,
      items: filteredItems,
      stats: { total, expired, fresh, critical, warning, wastePercentage }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  try {
    const { name, quantity, unit, expiryDate, category, notes } = req.body;

    if (!name || !quantity || !expiryDate) {
      return res.status(400).json({ success: false, message: 'Name, quantity, and expiry date are required.' });
    }

    const item = await Item.create({
      user: req.user._id,
      name,
      quantity,
      unit: unit || 'pcs',
      expiryDate,
      category: category || 'General',
      notes: notes || ''
    });

    res.status(201).json({ success: true, message: 'Item added successfully!', item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/items/:id
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user._id });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    const { name, quantity, unit, expiryDate, category, notes } = req.body;

    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.unit = unit || item.unit;
    item.expiryDate = expiryDate || item.expiryDate;
    item.category = category || item.category;
    item.notes = notes !== undefined ? notes : item.notes;

    await item.save();

    res.json({ success: true, message: 'Item updated successfully!', item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    res.json({ success: true, message: 'Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;