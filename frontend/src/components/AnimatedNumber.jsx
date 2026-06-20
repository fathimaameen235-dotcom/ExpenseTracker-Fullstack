import { useEffect, useRef, useState } from 'react'

// Animates a number counting up from its previous value to the new one.
// Used on the stats cards so changes feel alive instead of just snapping.
function AnimatedNumber({ value, prefix = '', decimals = 2 }) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const frameRef = useRef(null)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    const duration = 600
    const startTime = performance.now()

    cancelAnimationFrame(frameRef.current)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic — fast start, gentle finish
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      setDisplay(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span>
      {prefix}
      {display.toFixed(decimals)}
    </span>
  )
}

export default AnimatedNumber
