import { useState, useEffect, useMemo, useCallback } from 'react'
import axios from 'axios'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ToastContainer from './components/Toast'
import AnimatedNumber from './components/AnimatedNumber'
import './App.css'

// Base URL of our Spring Boot backend
const API_URL = 'http://localhost:8080/api/expenses'

let toastIdCounter = 0

function App() {
  // Holds all expenses fetched from backend
  const [expenses, setExpenses] = useState([])

  // Loading state while fetching data
  const [loading, setLoading] = useState(true)

  // Error message if something goes wrong
  const [error, setError] = useState('')

  // Controls the brief "saved" pulse on the summary card
  const [justAdded, setJustAdded] = useState(false)

  // Tracks the id of the most recently added expense, for row entry animation
  const [newestId, setNewestId] = useState(null)

  // The expense currently being edited (null = not editing, just adding)
  const [editingExpense, setEditingExpense] = useState(null)

  // Active toast notifications
  const [toasts, setToasts] = useState([])

  const pushToast = useCallback((message, type = 'success') => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Fetch all expenses from backend (GET request)
  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setExpenses(response.data)
      setError('')
    } catch (err) {
      console.error('Error fetching expenses:', err)
      const msg = 'Could not reach the server. Make sure the backend is running on port 8080.'
      setError(msg)
      pushToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Add a new expense (POST request)
  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post(API_URL, newExpense)
      // Add the new expense returned from backend into our list
      setExpenses((prevExpenses) => [response.data, ...prevExpenses])
      setError('')
      setJustAdded(true)
      setNewestId(response.data.id)
      setTimeout(() => setJustAdded(false), 1200)
      setTimeout(() => setNewestId(null), 900)
      pushToast(`"${newExpense.title}" added — ₹${Number(newExpense.amount).toFixed(2)}`, 'success')
    } catch (err) {
      console.error('Error adding expense:', err)
      pushToast('Could not add that expense. Please try again.', 'error')
    }
  }

  // Update an existing expense (PUT request)
  const updateExpense = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData)
      setExpenses((prev) => prev.map((e) => (e.id === id ? response.data : e)))
      setEditingExpense(null)
      pushToast(`"${updatedData.title}" updated`, 'success')
    } catch (err) {
      console.error('Error updating expense:', err)
      pushToast('Could not update that expense. Please try again.', 'error')
    }
  }

  // Delete an expense (DELETE request)
  const deleteExpense = async (id, title) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setExpenses((prev) => prev.filter((e) => e.id !== id))
      pushToast(`"${title || 'Expense'}" deleted`, 'info')
    } catch (err) {
      console.error('Error deleting expense:', err)
      pushToast('Could not delete that expense. Please try again.', 'error')
    }
  }

  // Fetch expenses once when the component first loads
  useEffect(() => {
    fetchExpenses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Derived stats — recalculated only when expenses change
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
    const count = expenses.length

    const today = new Date().toISOString().slice(0, 7) // "YYYY-MM"
    const thisMonth = expenses
      .filter((e) => e.date && e.date.startsWith(today))
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0)

    const categoryTotals = expenses.reduce((acc, e) => {
      const cat = e.category || 'Other'
      acc[cat] = (acc[cat] || 0) + (Number(e.amount) || 0)
      return acc
    }, {})

    let topCategory = '—'
    let topAmount = 0
    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      if (amt > topAmount) {
        topCategory = cat
        topAmount = amt
      }
    })

    return { total, count, thisMonth, topCategory }
  }, [expenses])

  return (
    <div className="app-shell">
      <div className="noise-overlay" aria-hidden="true"></div>

      <ToastContainer toasts={toasts} onClose={dismissToast} />

      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-mark">₹</span>
            <div>
              <h1>Expense Tracker</h1>
              <p className="subtitle">Know where every rupee goes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="stats-row" aria-label="Summary">
          <div className={`stat-card stat-primary fade-in-up delay-0 ${justAdded ? 'pulse' : ''}`}>
            <span className="stat-label">Total Spent</span>
            <span className="stat-value">
              <AnimatedNumber value={stats.total} prefix="₹" />
            </span>
          </div>
          <div className="stat-card fade-in-up delay-1">
            <span className="stat-label">This Month</span>
            <span className="stat-value">
              <AnimatedNumber value={stats.thisMonth} prefix="₹" />
            </span>
          </div>
          <div className="stat-card fade-in-up delay-2">
            <span className="stat-label">Top Category</span>
            <span className="stat-value stat-value-text">{stats.topCategory}</span>
          </div>
          <div className="stat-card fade-in-up delay-3">
            <span className="stat-label">Entries</span>
            <span className="stat-value">
              <AnimatedNumber value={stats.count} decimals={0} />
            </span>
          </div>
        </section>

        {error && (
          <div className="error-banner" role="alert">
            <span className="error-icon">!</span>
            {error}
          </div>
        )}

        <div className="content-grid">
          <div className="left-panel fade-in-up delay-2">
            <ExpenseForm
              onAddExpense={addExpense}
              onUpdateExpense={updateExpense}
              editingExpense={editingExpense}
              onCancelEdit={() => setEditingExpense(null)}
            />
          </div>

          <div className="right-panel fade-in-up delay-3">
            {loading ? (
              <div className="expense-list">
                <div className="list-header">
                  <h2>All Expenses</h2>
                </div>
                <div className="skeleton-rows">
                  {[0, 1, 2, 3].map((i) => (
                    <div className="skeleton-row" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                      <span className="skeleton-block skeleton-title"></span>
                      <span className="skeleton-block skeleton-badge"></span>
                      <span className="skeleton-block skeleton-date"></span>
                      <span className="skeleton-block skeleton-amount"></span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ExpenseList
                expenses={expenses}
                newestId={newestId}
                onEdit={setEditingExpense}
                onDelete={deleteExpense}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Expense Tracker — built with React &amp; Spring Boot</p>
      </footer>
    </div>
  )
}

export default App
