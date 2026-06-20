import { useState, useMemo } from 'react'

// Maps category name to a display icon — keeps the table visually scannable
const CATEGORY_ICONS = {
  Food: '🍔',
  Travel: '✈️',
  Shopping: '🛍️',
  Bills: '🧾',
  Entertainment: '🎬',
  Health: '💊',
  Other: '📦',
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function ExpenseList({ expenses, newestId, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // Tracks which row is awaiting delete confirmation (click-to-arm pattern,
  // avoids a blocking browser confirm() popup)
  const [confirmingId, setConfirmingId] = useState(null)

  // Unique categories present in the current data, for the filter row
  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category || 'Other'))
    return ['All', ...Array.from(set)]
  }, [expenses])

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const title = e.title || ''
      const category = e.category || 'Other'
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [expenses, search, activeCategory])

  const handleDeleteClick = (expense) => {
    if (confirmingId === expense.id) {
      onDelete(expense.id, expense.title)
      setConfirmingId(null)
    } else {
      setConfirmingId(expense.id)
      // auto-reset the confirm state if they don't click again
      setTimeout(() => {
        setConfirmingId((current) => (current === expense.id ? null : current))
      }, 3000)
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <div className="list-header">
          <h2>All Expenses</h2>
        </div>
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p className="empty-title">No expenses yet</p>
          <p className="empty-text">Add your first expense using the form to see it here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>All Expenses</h2>
        <span className="list-count">{filtered.length} of {expenses.length}</span>
      </div>

      <div className="list-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p className="empty-title">No matches</p>
          <p className="empty-text">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th className="th-amount">Amount</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((expense, index) => (
                <tr
                  key={expense.id ?? `${expense.title}-${expense.date}-${index}`}
                  className={`row-enter ${expense.id === newestId ? 'row-highlight' : ''}`}
                  style={{ animationDelay: `${Math.min(index, 8) * 0.04}s` }}
                >
                  <td className="title-cell">{expense.title || 'Untitled'}</td>
                  <td>
                    <span className="category-badge">
                      <span className="badge-icon">{CATEGORY_ICONS[expense.category] || '📦'}</span>
                      {expense.category || 'Other'}
                    </span>
                  </td>
                  <td className="date-cell">{formatDate(expense.date)}</td>
                  <td className="amount-cell">₹{(Number(expense.amount) || 0).toFixed(2)}</td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="icon-btn edit-btn"
                      onClick={() => onEdit(expense)}
                      title="Edit"
                      aria-label={`Edit ${expense.title || 'expense'}`}
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      className={`icon-btn delete-btn ${confirmingId === expense.id ? 'confirming' : ''}`}
                      onClick={() => handleDeleteClick(expense)}
                      title={confirmingId === expense.id ? 'Click again to confirm' : 'Delete'}
                      aria-label={`Delete ${expense.title || 'expense'}`}
                    >
                      {confirmingId === expense.id ? 'Sure?' : '🗑'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ExpenseList
