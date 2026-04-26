import React, { useState, useEffect } from 'react'
import './AddItemModal.css'

const CATEGORIES = ['General', 'Dairy', 'Meat', 'Vegetables', 'Fruits', 'Grains', 'Beverages', 'Snacks', 'Frozen', 'Condiments']
const UNITS = ['pcs', 'kg', 'g', 'L', 'ml', 'pack', 'box', 'bottle', 'can']
const EMPTY_FORM = { name: '', quantity: '', unit: 'pcs', expiryDate: '', category: 'General', notes: '' }

const AddItemModal = ({ onClose, onSubmit, editItem, loading }) => {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editItem) {
      setForm({
        name: editItem.name || '',
        quantity: editItem.quantity || '',
        unit: editItem.unit || 'pcs',
        expiryDate: editItem.expiryDate ? editItem.expiryDate.split('T')[0] : '',
        category: editItem.category || 'General',
        notes: editItem.notes || '',
      })
    }
  }, [editItem])

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Item name is required.'
    if (!form.quantity || form.quantity < 1) errs.quantity = 'Quantity must be at least 1.'
    if (!form.expiryDate) errs.expiryDate = 'Expiry date is required.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel fade-in">
        <div className="modal-header">
          <div>
            <h2>{editItem ? 'Edit Item' : 'Add New Item'}</h2>
            <p>{editItem ? 'Update the details below.' : 'Fill in the details to track a new item.'}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-grid">
            <div className={`modal-field modal-field-full ${errors.name ? 'field-error' : ''}`}>
              <label>Item Name <span className="required">*</span></label>
              <div className="field-input-wrap">
                <span className="field-icon">🏷️</span>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Whole Milk, Chicken Breast..." />
              </div>
              {errors.name && <span className="field-error-msg">{errors.name}</span>}
            </div>

            <div className={`modal-field ${errors.quantity ? 'field-error' : ''}`}>
              <label>Quantity <span className="required">*</span></label>
              <div className="field-input-wrap">
                <span className="field-icon">🔢</span>
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="1" min="1" />
              </div>
              {errors.quantity && <span className="field-error-msg">{errors.quantity}</span>}
            </div>

            <div className="modal-field">
              <label>Unit</label>
              <div className="field-input-wrap">
                <span className="field-icon">📐</span>
                <select name="unit" value={form.unit} onChange={handleChange}>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div className={`modal-field ${errors.expiryDate ? 'field-error' : ''}`}>
              <label>Expiry Date <span className="required">*</span></label>
              <div className="field-input-wrap">
                <span className="field-icon">📅</span>
                <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} min={today} />
              </div>
              {errors.expiryDate && <span className="field-error-msg">{errors.expiryDate}</span>}
            </div>

            <div className="modal-field">
              <label>Category</label>
              <div className="field-input-wrap">
                <span className="field-icon">🗂️</span>
                <select name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="modal-field modal-field-full">
              <label>Notes <span className="optional">(optional)</span></label>
              <div className="field-input-wrap field-textarea-wrap">
                <span className="field-icon" style={{ top: '14px' }}>📝</span>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Any additional notes..." rows={2} />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : (editItem ? '💾' : '➕')}
              {loading ? 'Saving...' : editItem ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItemModal
