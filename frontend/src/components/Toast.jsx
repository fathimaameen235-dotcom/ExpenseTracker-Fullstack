import { useEffect } from 'react'

// A single toast notification — auto-dismisses after `duration` ms
function Toast({ id, message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 3200)
    return () => clearTimeout(timer)
  }, [id, onClose])

  const icon = type === 'success' ? '✓' : type === 'error' ? '!' : 'i'

  return (
    <div className={`toast toast-${type}`} role="status">
      <span className="toast-icon">{icon}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={() => onClose(id)} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}

// Container that stacks and positions all active toasts
function ToastContainer({ toasts, onClose }) {
  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  )
}

export default ToastContainer
