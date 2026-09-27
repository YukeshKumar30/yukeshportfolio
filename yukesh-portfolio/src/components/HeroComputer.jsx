import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * HeroComputer: A luxury editorial 3D workstation animation.
 * Features a sleek floating laptop with dynamic website building animation:
 * - Stage 0: Code typing in IDE
 * - Stage 1: Blueprint wireframe grid assembling
 * - Stage 2: Real website UI materializing
 * - Stage 3: Virtual cursor interaction & live deployment
 *
 * Performance:
 * - Uses direct DOM transform manipulation via requestAnimationFrame for silky 60fps 3D mouse tilt.
 * - Zero React re-renders on mousemove.
 * - Respects prefers-reduced-motion.
 */
export default function HeroComputer() {
  const reduced = useReducedMotion()
  const tiltRef = useRef(null)
  const [stage, setStage] = useState(0) // 0: code, 1: wireframe, 2: ui, 3: deploy
  const [typingIndex, setTypingIndex] = useState(0)

  // Code snippet typed line-by-line
  const codeSnippet = [
    "import { Portfolio } from 'yukesh'",
    "const site = createSite({",
    "  developer: 'Yukesh Kumar',",
    "  stack: ['React', 'Python', 'SQL'],",
    "  theme: 'luxury-editorial',",
    "  headline: 'Crafting digital experiences',",
    "})",
    "site.deploy({ mode: 'live' })"
  ]

  // Multi-stage website building cycle: 11.5s total
  useEffect(() => {
    if (reduced) return

    let currentStage = 0
    const stageDurations = [3400, 2400, 3200, 2600]

    let timer
    const advanceStage = () => {
      timer = setTimeout(() => {
        currentStage = (currentStage + 1) % 4
        setStage(currentStage)
        advanceStage()
      }, stageDurations[currentStage])
    }

    advanceStage()
    return () => clearTimeout(timer)
  }, [reduced])

  // Typewriter effect for Stage 0 (Code Editor)
  useEffect(() => {
    if (reduced || stage !== 0) {
      setTypingIndex(codeSnippet.length)
      return
    }

    setTypingIndex(0)
    let idx = 0
    const interval = setInterval(() => {
      idx++
      setTypingIndex(idx)
      if (idx >= codeSnippet.length) {
        clearInterval(interval)
      }
    }, 240)

    return () => clearInterval(interval)
  }, [stage, reduced])

  // Silky 60fps Lerped 3D Mouse Parallax via RAF (Zero React state re-renders)
  useEffect(() => {
    if (reduced) return

    let mouseX = 0.5
    let mouseY = 0.5
    let currentTiltX = 0
    let currentTiltY = 0
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }

    const updateTilt = () => {
      const targetTiltX = (mouseY - 0.5) * -14 // up/down
      const targetTiltY = (mouseX - 0.5) * 18  // left/right

      // Smooth lerp (interpolation)
      currentTiltX += (targetTiltX - currentTiltX) * 0.06
      currentTiltY += (targetTiltY - currentTiltY) * 0.06

      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg) translateZ(15px)`
      }

      rafId = requestAnimationFrame(updateTilt)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(updateTilt)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [reduced])

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── 3D Tilt Wrapper with GPU Acceleration ── */}
      <div
        ref={tiltRef}
        className="will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: reduced ? 'none' : 'box-shadow 0.3s ease',
        }}
      >
        {/* ── LAPTOP LID & DISPLAY CHASSIS ── */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            width: 'clamp(270px, 30vw, 450px)',
            height: 'clamp(185px, 20vw, 295px)',
            background: 'linear-gradient(150deg, #171A20 0%, #0d0f14 100%)',
            border: '1.2px solid rgba(198, 167, 106, 0.4)',
            boxShadow:
              '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(198, 167, 106, 0.15), inset 0 1px 1px rgba(244, 242, 237, 0.2)',
          }}
        >
          {/* Top screen bezel camera dot */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#232731] flex items-center justify-center z-30">
            <div className="w-0.5 h-0.5 rounded-full bg-[#C6A76A] opacity-70" />
          </div>

          {/* ── WINDOW HEADER BAR ── */}
          <div
            className="flex items-center justify-between px-3 pt-2 pb-1.5 z-20 border-b select-none"
            style={{
              background: 'rgba(17, 19, 24, 0.96)',
              borderColor: 'rgba(244, 242, 237, 0.08)',
            }}
          >
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C6A76A] opacity-90 shadow-sm shadow-[#C6A76A]/40" />
              <span className="w-2 h-2 rounded-full bg-[#999DA7] opacity-60" />
              <span className="w-2 h-2 rounded-full bg-[#F4F2ED] opacity-30" />
            </div>

            {/* URL / Status bar */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] tracking-wide font-mono"
              style={{
                background: 'rgba(8, 9, 11, 0.85)',
                border: '1px solid rgba(198, 167, 106, 0.25)',
                color: '#F4F2ED',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A] animate-pulse" />
              <span className="text-[#999DA7] text-[9px]">https://</span>
              <span className="text-[#F4F2ED]">yukesh.dev</span>
              <span className="text-[#C6A76A] text-[9px] ml-1">
                {stage === 0 && '• code'}
                {stage === 1 && '• blueprint'}
                {stage === 2 && '• ui render'}
                {stage === 3 && '• live 60fps'}
              </span>
            </div>

            {/* Active Mode Pills */}
            <div className="flex items-center gap-1 text-[9px] font-mono">
              <span
                className={`px-1.5 py-0.5 rounded text-[8px] transition-colors ${
                  stage === 0
                    ? 'bg-[#C6A76A]/20 text-[#C6A76A] border border-[#C6A76A]/40 font-medium'
                    : 'text-[#999DA7] opacity-50'
                }`}
              >
                Code
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[8px] transition-colors ${
                  stage !== 0
                    ? 'bg-[#C6A76A]/20 text-[#C6A76A] border border-[#C6A76A]/40 font-medium'
                    : 'text-[#999DA7] opacity-50'
                }`}
              >
                Preview
              </span>
            </div>
          </div>

          {/* ── SCREEN DISPLAY VIEWPORT ── */}
          <div
            className="relative w-full h-[calc(100%-29px)] p-2.5 overflow-hidden font-mono"
            style={{
              background: '#08090B',
            }}
          >
            {/* Subtle background tech grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(198, 167, 106, 0.5) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />

            {/* ══════════════════════════════════════════════════════════════
                STAGE 0: CODE TYPING VIEW (Developer IDE)
            ══════════════════════════════════════════════════════════════ */}
            {stage === 0 && (
              <div className="relative h-full flex flex-col justify-between text-[9px] leading-relaxed transition-opacity duration-300">
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[8px] text-[#999DA7] pb-1 border-b border-white/5 mb-1.5">
                    <span className="flex items-center gap-1 text-[#C6A76A]">
                      <span className="text-[10px]">⚛</span> App.jsx
                    </span>
                    <span className="text-[#999DA7]/60">JavaScript (JSX)</span>
                  </div>

                  {codeSnippet.slice(0, typingIndex).map((line, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[#999DA7] opacity-40 text-[8px] select-none w-3">
                        {idx + 1}
                      </span>
                      <span
                        style={{
                          color: line.startsWith('import')
                            ? '#C6A76A'
                            : line.startsWith('const')
                            ? '#F4F2ED'
                            : line.includes(':')
                            ? '#d6c29a'
                            : '#999DA7',
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  ))}

                  {/* Blinking gold caret */}
                  <span className="inline-block w-1.5 h-3 bg-[#C6A76A] ml-5 animate-pulse" />
                </div>

                {/* Bottom compiling status */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[8px] text-[#999DA7]">
                  <span className="flex items-center gap-1.5 text-[#C6A76A]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C6A76A] animate-ping" />
                    Vite Compiling component tree...
                  </span>
                  <span className="text-[#F4F2ED]/70">18ms</span>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                STAGE 1: WIREFRAME BLUEPRINT GRID (Layout Assembling)
            ══════════════════════════════════════════════════════════════ */}
            {stage === 1 && (
              <div className="relative h-full flex flex-col justify-between animate-fadeIn text-[8px]">
                {/* Wireframe Nav Skeleton */}
                <div className="flex items-center justify-between px-2 py-1 border border-dashed border-[#C6A76A]/40 rounded bg-[#C6A76A]/5">
                  <div className="w-8 h-2 bg-[#C6A76A]/40 rounded-sm animate-pulse" />
                  <div className="flex gap-1.5">
                    <div className="w-5 h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-5 h-1.5 bg-white/20 rounded-sm" />
                    <div className="w-5 h-1.5 bg-white/20 rounded-sm" />
                  </div>
                </div>

                {/* Wireframe Hero Skeleton */}
                <div className="my-1 p-2 border border-dashed border-[#C6A76A]/50 rounded bg-[#C6A76A]/5 flex flex-col gap-1.5">
                  <div className="w-16 h-2 bg-[#C6A76A]/40 rounded-sm" />
                  <div className="w-full h-3.5 bg-white/20 rounded-sm animate-pulse" />
                  <div className="w-3/4 h-2 bg-white/10 rounded-sm" />
                  <div className="flex gap-2 mt-1">
                    <div className="w-12 h-3 bg-[#C6A76A]/50 rounded-full" />
                    <div className="w-12 h-3 border border-white/20 rounded-full" />
                  </div>
                </div>

                {/* Wireframe Cards Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-8 border border-dashed border-white/20 rounded p-1 flex flex-col justify-between bg-white/[0.02]">
                    <div className="w-10 h-1.5 bg-[#C6A76A]/30 rounded-sm" />
                    <div className="w-full h-2 bg-white/10 rounded-sm" />
                  </div>
                  <div className="h-8 border border-dashed border-white/20 rounded p-1 flex flex-col justify-between bg-white/[0.02]">
                    <div className="w-10 h-1.5 bg-[#C6A76A]/30 rounded-sm" />
                    <div className="w-full h-2 bg-white/10 rounded-sm" />
                  </div>
                </div>

                <div className="text-center text-[7px] text-[#C6A76A] tracking-wider uppercase pt-0.5 opacity-80">
                  ⚡ Assembling DOM Tree & Responsive Grid...
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                STAGE 2: ASSEMBLED WEBSITE (Materialized UI)
            ══════════════════════════════════════════════════════════════ */}
            {stage === 2 && (
              <div className="relative h-full flex flex-col justify-between animate-fadeIn text-[8px]">
                {/* Rendered Navbar */}
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="font-serif font-bold text-[#F4F2ED] text-[10px] tracking-tight">
                    YK<span className="text-[#C6A76A]">.</span>
                  </span>
                  <div className="flex items-center gap-2 text-[7px] text-[#999DA7]">
                    <span className="text-[#F4F2ED]">Home</span>
                    <span>Work</span>
                    <span>About</span>
                    <span>Contact</span>
                  </div>
                </div>

                {/* Rendered Hero */}
                <div className="my-auto py-1">
                  <span className="inline-block px-1.5 py-0.5 rounded-full text-[6px] uppercase tracking-wider bg-[#C6A76A]/20 text-[#C6A76A] border border-[#C6A76A]/30 mb-1">
                    Full Stack Developer
                  </span>
                  <h4 className="font-serif text-[11px] leading-tight text-[#F4F2ED] tracking-tight">
                    Crafting digital experiences with intention.
                  </h4>
                  <p className="text-[7px] text-[#999DA7] leading-snug mt-0.5 max-w-[210px]">
                    Building thoughtful, responsive client websites & web apps.
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded-full text-[7px] font-medium bg-[#F4F2ED] text-[#08090B]">
                      Explore Work ↗
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[7px] font-medium border border-white/20 text-[#F4F2ED]">
                      Resume
                    </span>
                  </div>
                </div>

                {/* Rendered Project Mini-Card */}
                <div className="flex items-center justify-between p-1.5 rounded-md bg-[#111318] border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-[#171A20] border border-[#C6A76A]/30 flex items-center justify-center text-[8px] text-[#C6A76A]">
                      01
                    </div>
                    <div>
                      <div className="text-[7.5px] font-medium text-[#F4F2ED]">
                        Kallai Gift Center
                      </div>
                      <div className="text-[6.5px] text-[#999DA7]">
                        Client Project • Live
                      </div>
                    </div>
                  </div>
                  <span className="text-[6.5px] px-1 py-0.5 rounded bg-[#C6A76A]/20 text-[#C6A76A]">
                    React
                  </span>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════
                STAGE 3: INTERACTIVE DEMO & DEPLOYMENT CELEBRATION
            ══════════════════════════════════════════════════════════════ */}
            {stage === 3 && (
              <div className="relative h-full flex flex-col justify-between animate-fadeIn text-[8px]">
                {/* Top Success Banner */}
                <div className="flex items-center justify-between px-2 py-1 rounded bg-[#C6A76A]/20 border border-[#C6A76A]/40 text-[#F4F2ED]">
                  <span className="flex items-center gap-1.5 text-[8px] text-[#C6A76A] font-semibold">
                    <span>✨</span> BUILD COMPLETE
                  </span>
                  <span className="text-[7px] text-[#F4F2ED]/90">
                    Deployed to Production
                  </span>
                </div>

                {/* Interactive Screen Preview with Virtual Cursor */}
                <div className="relative my-auto p-2 rounded bg-[#111318] border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[9px] font-serif text-[#F4F2ED]">
                        Yukesh Kumar Portfolio
                      </div>
                      <div className="text-[7px] text-[#999DA7] mt-0.5">
                        Performance: 100 • SEO: 100 • 60 FPS
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Virtual button clicked by mouse */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="relative">
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded-full text-[7.5px] font-semibold bg-[#C6A76A] text-[#08090B] shadow-lg shadow-[#C6A76A]/30 flex items-center gap-1"
                      >
                        Active Website ✓
                      </button>

                      {/* Click ripple animation */}
                      <span className="absolute -inset-1 rounded-full border border-[#C6A76A] animate-ping opacity-60" />

                      {/* Virtual Mouse Pointer */}
                      <div className="absolute -top-1 -right-2 transform translate-x-1 translate-y-1 animate-bounce pointer-events-none">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="#F4F2ED"
                          stroke="#08090B"
                          strokeWidth="2"
                        >
                          <polygon points="3 3 10 21 14 13 22 9 3 3" />
                        </svg>
                      </div>
                    </div>

                    <span className="text-[7px] text-[#999DA7]">
                      0 console errors
                    </span>
                  </div>
                </div>

                {/* Metrics Badges */}
                <div className="flex items-center justify-around py-1 border-t border-white/5 text-[7px] text-[#999DA7]">
                  <span className="text-[#C6A76A]">● Responsive</span>
                  <span>● Fast Hydration</span>
                  <span className="text-[#F4F2ED]">● Modern UI</span>
                </div>
              </div>
            )}

            {/* Glass reflection gradient across screen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(244, 242, 237, 0.05) 0%, transparent 45%, rgba(198, 167, 106, 0.03) 100%)',
              }}
            />
          </div>
        </div>

        {/* ── LAPTOP LOWER BASE & KEYBOARD CHIN (3D Perspective) ── */}
        <div
          className="relative mx-auto rounded-b-xl"
          style={{
            width: 'clamp(300px, 33vw, 490px)',
            height: 'clamp(10px, 1.2vw, 15px)',
            background: 'linear-gradient(180deg, #1E222B 0%, #0d0f14 100%)',
            border: '1px solid rgba(198, 167, 106, 0.35)',
            borderTop: 'none',
            boxShadow:
              '0 15px 40px rgba(0, 0, 0, 0.95), 0 0 30px rgba(198, 167, 106, 0.12)',
          }}
        >
          {/* Center display open notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-b-md"
            style={{
              background: '#08090B',
              borderBottom: '1px solid rgba(198, 167, 106, 0.35)',
            }}
          />
          {/* Subtle gold glow beneath the chassis */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2.5 rounded-full blur-md pointer-events-none"
            style={{
              background: 'rgba(198, 167, 106, 0.3)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
