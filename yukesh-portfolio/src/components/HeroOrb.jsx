import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import HeroComputer from './HeroComputer'

// ─── Design tokens (mirrors the site palette exactly) ───────────────────────
const GOLD        = 'rgba(198, 167, 106,'  // #C6A76A – site gold accent
const CREAM       = 'rgba(244, 242, 237,'  // #F4F2ED – site ink/cream

// ─── Utility ────────────────────────────────────────────────────────────────
const rand  = (min, max) => Math.random() * (max - min) + min
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// ─── Particle definition ────────────────────────────────────────────────────
function createParticle(cx, cy, orbRadius) {
  const angle  = rand(0, Math.PI * 2)
  const dist   = rand(orbRadius * 0.65, orbRadius * 1.55)
  return {
    x:       cx + Math.cos(angle) * dist,
    y:       cy + Math.sin(angle) * dist,
    ox:      cx + Math.cos(angle) * dist,
    oy:      cy + Math.sin(angle) * dist,
    r:       rand(1, 2.2),
    alpha:   rand(0.25, 0.75),
    driftX:  rand(-0.18, 0.18),
    driftY:  rand(-0.18, 0.18),
    phase:   rand(0, Math.PI * 2),
    speed:   rand(0.003, 0.009),
  }
}

// ─── Node definition (tiny inner digital dots) ───────────────────────────────
function createNode(cx, cy, orbRadius) {
  const angle = rand(0, Math.PI * 2)
  const dist  = rand(0, orbRadius * 0.72)
  return {
    x:     cx + Math.cos(angle) * dist,
    y:     cy + Math.sin(angle) * dist,
    r:     rand(1.2, 2.8),
    alpha: rand(0.08, 0.25),
    phase: rand(0, Math.PI * 2),
    speed: rand(0.002, 0.006),
  }
}

// ─── Orbit rings config ───────────────────────────────────────────────────────
const ORBIT_RINGS = [
  { radiusMult: 1.25, tiltX: 18,  tiltY: 5,  speed: 0.0035, alpha: 0.28, dashRatio: 0.55 },
  { radiusMult: 1.48, tiltX: -10, tiltY: 15, speed: 0.0022, alpha: 0.16, dashRatio: 0.40 },
  { radiusMult: 1.72, tiltX: 28,  tiltY: -8, speed: 0.0015, alpha: 0.10, dashRatio: 0.30 },
]

export default function HeroOrb() {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)
  const reduced   = useReducedMotion()

  const startLoop = useCallback((canvas) => {
    const ctx = canvas.getContext('2d')
    let t = 0
    let w = 0, h = 0
    let cx, cy, orbRadius
    let particles = []
    let nodes     = []

    function resize() {
      const dpr  = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      cx = w / 2
      cy = h / 2
      const minDim  = Math.min(w, h)
      orbRadius     = clamp(minDim * 0.44, 140, 310)
      const pCount  = w < 480 ? 10 : w < 768 ? 16 : 24
      const nCount  = w < 480 ? 6  : w < 768 ? 10 : 16
      particles = Array.from({ length: pCount }, () => createParticle(cx, cy, orbRadius))
      nodes     = Array.from({ length: nCount  }, () => createNode(cx, cy, orbRadius))
    }

    function drawOrbit(ring, px, py) {
      const r    = orbRadius * ring.radiusMult
      const circ = Math.PI * 2 * r
      ctx.save()
      ctx.translate(cx + px, cy + py)
      ctx.rotate((ring.tiltX * Math.PI) / 180)
      ctx.beginPath()
      ctx.ellipse(0, 0, r, r * Math.abs(Math.cos((ring.tiltY * Math.PI) / 180 + 0.3)), 0, 0, Math.PI * 2)
      ctx.setLineDash([circ * ring.dashRatio, circ * (1 - ring.dashRatio)])
      ctx.lineDashOffset = -(t * ring.speed) * circ
      ctx.strokeStyle    = `${GOLD}${ring.alpha})`
      ctx.lineWidth      = 0.9
      ctx.stroke()
      ctx.restore()
    }

    function drawNodeConnections(px, py) {
      const maxDist = orbRadius * 0.55
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const fade = 1 - dist / maxDist
            ctx.beginPath()
            ctx.moveTo(nodes[i].x + px, nodes[i].y + py)
            ctx.lineTo(nodes[j].x + px, nodes[j].y + py)
            ctx.strokeStyle = `${GOLD}${0.05 * fade})`
            ctx.lineWidth   = 0.5
            ctx.setLineDash([])
            ctx.stroke()
          }
        }
      }
    }

    function draw() {
      t += 1
      ctx.clearRect(0, 0, w, h)

      const mx = (mouseRef.current.x - 0.5) * 18
      const my = (mouseRef.current.y - 0.5) * 14
      const bobY  = Math.sin(t * 0.012) * 8
      const bobX  = Math.cos(t * 0.007) * 4
      const scrollOffset = scrollRef.current * 0.16
      const scrollAlpha  = clamp(1 - scrollRef.current * 0.003, 0, 1)
      const px = mx * 0.5 + bobX
      const py = my * 0.5 + bobY - scrollOffset

      ctx.globalAlpha = scrollAlpha

      // Outer ambient glow halo
      const glowGrad = ctx.createRadialGradient(cx + px, cy + py, orbRadius * 0.5, cx + px, cy + py, orbRadius * 2.2)
      glowGrad.addColorStop(0,   `${GOLD}0.08)`)
      glowGrad.addColorStop(0.45, `${GOLD}0.03)`)
      glowGrad.addColorStop(1,   `${GOLD}0)`)
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(cx + px, cy + py, orbRadius * 2.2, 0, Math.PI * 2)
      ctx.fill()

      // Transparent glass orb sphere
      const orbGrad = ctx.createRadialGradient(
        cx + px - orbRadius * 0.25, cy + py - orbRadius * 0.25, 0,
        cx + px,                    cy + py,                    orbRadius
      )
      orbGrad.addColorStop(0,    'rgba(28, 26, 24, 0.40)')
      orbGrad.addColorStop(0.5,  'rgba(16, 14, 12, 0.48)')
      orbGrad.addColorStop(0.85, 'rgba(12, 10, 9,  0.58)')
      orbGrad.addColorStop(1,    `${GOLD}0.22)`)
      ctx.beginPath()
      ctx.arc(cx + px, cy + py, orbRadius, 0, Math.PI * 2)
      ctx.fillStyle = orbGrad
      ctx.fill()

      // Top-left specular highlight
      const specGrad = ctx.createRadialGradient(
        cx + px - orbRadius * 0.30, cy + py - orbRadius * 0.30, 0,
        cx + px - orbRadius * 0.10, cy + py - orbRadius * 0.10, orbRadius * 0.65
      )
      specGrad.addColorStop(0, `${CREAM}0.06)`)
      specGrad.addColorStop(1, `${CREAM}0)`)
      ctx.fillStyle = specGrad
      ctx.beginPath()
      ctx.arc(cx + px, cy + py, orbRadius, 0, Math.PI * 2)
      ctx.fill()

      // Thin gold rim
      ctx.beginPath()
      ctx.arc(cx + px, cy + py, orbRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `${GOLD}0.25)`
      ctx.lineWidth   = 0.8
      ctx.setLineDash([])
      ctx.stroke()

      // Rotating orbit rings
      ORBIT_RINGS.forEach((ring) => drawOrbit(ring, px * 0.6, py * 0.6))

      // Inner node network
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx + px, cy + py, orbRadius * 0.96, 0, Math.PI * 2)
      ctx.clip()
      drawNodeConnections(px, py)
      nodes.forEach((n) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * n.speed + n.phase)
        ctx.beginPath()
        ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `${GOLD}${n.alpha * pulse})`
        ctx.fill()
      })
      ctx.restore()

      // Floating golden particles
      particles.forEach((p) => {
        p.ox += p.driftX
        p.oy += p.driftY
        p.ox += (p.x - p.ox) * 0.0015
        p.oy += (p.y - p.oy) * 0.0015
        p.phase += p.speed
        const a    = 0.5 + 0.5 * Math.sin(p.phase)
        const pdx  = p.ox - (cx + mx)
        const pdy  = p.oy - (cy + my)
        const pd   = Math.sqrt(pdx * pdx + pdy * pdy)
        const repR = orbRadius * 0.5
        const drawX = pd < repR ? p.ox + (pdx / pd) * (repR - pd) * 0.04 + px : p.ox + px
        const drawY = pd < repR ? p.oy + (pdy / pd) * (repR - pd) * 0.04 + py : p.oy + py

        ctx.beginPath()
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${GOLD}${p.alpha * a})`
        ctx.fill()

        // Soft glow halo
        const pGlow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.r * 3.5)
        pGlow.addColorStop(0, `${GOLD}${p.alpha * a * 0.3})`)
        pGlow.addColorStop(1, `${GOLD}0)`)
        ctx.fillStyle = pGlow
        ctx.beginPath()
        ctx.arc(drawX, drawY, p.r * 3.5, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const cleanup = startLoop(canvas)

    const onMouse  = (e) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    const onScroll = () => { scrollRef.current = window.scrollY }

    window.addEventListener('mousemove', onMouse,  { passive: true })
    window.addEventListener('scroll',    onScroll, { passive: true })

    return () => {
      cleanup()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll',    onScroll)
    }
  }, [reduced, startLoop])

  if (reduced) return null

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      {/* Background Canvas: Ambient glow, rotating orbit rings, and floating gold particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none block"
      />

      {/* 3D Floating Workstation Laptop: Building website in real-time */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none px-4">
        <HeroComputer />
      </div>
    </div>
  )
}

