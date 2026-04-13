import { useEffect, useRef, useState } from 'react'

function CounterCard({ label, value = 0 }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [highlight, setHighlight] = useState(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    const start = prevValueRef.current ?? 0
    const end = value ?? 0

    if (start === end) return

    setHighlight(true)
    setTimeout(() => setHighlight(false), 1000)

    const duration = 700
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const current = Math.floor(
        start + (end - start) * progress
      )

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(end)
        prevValueRef.current = end
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return (
    <div className={`counter-card ${highlight ? 'highlight' : ''}`}>
      <div className="counter-label">{label}</div>
      <div className="counter-value">{displayValue}</div>
    </div>
  )
}

export default CounterCard
