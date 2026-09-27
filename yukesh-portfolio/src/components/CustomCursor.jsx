import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hoveringInteractive, setHoveringInteractive] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }
    window.addEventListener('mousemove', move)

    const overHandler = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        setHoveringInteractive(true)
        setLabel(target.getAttribute('data-cursor') || '')
      } else {
        setHoveringInteractive(false)
        setLabel('')
      }
    }
    window.addEventListener('mouseover', overHandler)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', overHandler)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      <div
        className={`flex items-center justify-center rounded-full border border-gold/60 text-[10px] type-label text-gold bg-bg/40 backdrop-blur-sm transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2 ${
          hoveringInteractive ? 'w-16 h-16' : 'w-2.5 h-2.5'
        }`}
      >
        {hoveringInteractive ? label : ''}
      </div>
    </div>
  )
}
