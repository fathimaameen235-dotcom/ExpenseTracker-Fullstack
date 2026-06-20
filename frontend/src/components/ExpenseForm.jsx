import { useState, useEffect } from 'react'

// Categories paired with a simple icon glyph — no icon library needed
const CATEGORIES = [
  { name: 'Food', icon: '🍔' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Bills', icon: '🧾' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Health', icon: '💊' },
  { name: 'Other', icon: '📦' },
]

function ExpenseForm({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }) {
  const isEditing = Boolean(editingExpense)

  // Form field states
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))

  // Tracks validation error message
  const [formError, setFormError] = useState('')

  // Triggers a brief shake animation when validation fails
  const [shake, setShake] = useState(false)

  // Brief visual confirmation after a successful add
  const [submitted, setSubmitted] = useState(false)

  // When an expense is selected for editing, populate the form with its values
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || '')
      setAmount(editingExpense.amount ?? '')
      setCategory(editingExpense.category || 'Food')
      setDate(editingExpense.date || new Date().toISOString().slice(0, 10))
      setFormError('')
    }
  }, [editingExpense])

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 420)
  }

  const resetForm = () => {
    setTitle('')
    setAmount('')
    setCategory('Food')
    setDate(new Date().toISOString().slice(0, 10))
    setFormError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault() // stop page reload on submit

    // Simple validation
    if (!title.trim() || !amount || !date) {
      setFormError('Please fill in every field before adding.')
      triggerShake()
      return
    }

    if (Number(amount) <= 0) {
      setFormError('Amount must be greater than zero.')
      triggerShake()
      return
    }

    // Build the expense object matching backend's expected format
    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category: category,
      date: date,
    }

    if (isEditing) {
      onUpdateExpense(editingExpense.id, expenseData)
      resetForm()
    } else {
      onAddExpense(expenseData)
      resetForm()
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 1500)
    }
  }

  const handleCancel = () => {
    resetForm()
    onCancelEdit()
  }

  return (
    <form className={`expense-form ${shake ? 'shake' : ''} ${isEditing ? 'editing' : ''}`} onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
        <span className={`form-eyebrow ${isEditing ? 'eyebrow-editing' : ''}`}>
          {isEditing ? 'Editing' : 'New entry'}
        </span>
      </div>

      {formError && (
        <p className="form-error">
          <span className="error-icon">!</span>
          {formError}
        </p>
      )}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="e.g. Groceries"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <div className="input-with-prefix">
            <span className="input-prefix">₹</span>
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Category</label>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat.name}
              className={`category-chip ${category === cat.name ? 'active' : ''}`}
              onClick={() => setCategory(cat.name)}
            >
              <span className="chip-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={`submit-btn ${submitted ? 'success' : ''}`}>
          {isEditing ? 'Save Changes' : submitted ? '✓ Added' : 'Add Expense'}
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm
