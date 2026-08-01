import { useEffect, useRef } from 'react'

/**
 * Network Constellation Animation
 * Concentrates particles along the left and bottom edges of the container,
 * with lines connecting nearby particles.
 */
interface Props {
  color?: string; // RGB values like '100, 116, 139'
}

export default function HeroNetworkAnimation({ color = '100, 116, 139' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)

  // Update the ref whenever the color prop changes
  useEffect(() => {
    colorRef.current = color
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    /* ── Particle setup ── */
    // We want particles to cluster near the left edge (x near 0) and bottom edge (y near height)
    const TOTAL = 180

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseAlpha: number
    }

    const particles: Particle[] = []

    const initParticle = (): Particle => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      // Determine if this particle belongs to the "left wall" or "bottom wall"
      const isLeft = Math.random() > 0.5

      let x, y
      if (isLeft) {
        // Left wall: x is heavily weighted towards 0
        x = Math.pow(Math.random(), 3) * (w * 0.4) // max 40% width, mostly near 0
        y = Math.random() * h
      } else {
        // Bottom wall: y is heavily weighted towards h
        x = Math.random() * w
        y = h - Math.pow(Math.random(), 3) * (h * 0.5) // max 50% height from bottom
      }

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1 + Math.random() * 2,
        baseAlpha: 0.1 + Math.random() * 0.5
      }
    }

    for (let i = 0; i < TOTAL; i++) {
      particles.push(initParticle())
    }

    const connectionDistance = 120 * dpr

    /* ── Draw loop ── */
    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Update positions
      for (let i = 0; i < TOTAL; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Bounce or wrap
        if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          Object.assign(p, initParticle())
        }
      }

      // Draw connections
      ctx.lineWidth = 0.6
      for (let i = 0; i < TOTAL; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < TOTAL; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance / dpr) {
            const alpha = (1 - dist / (connectionDistance / dpr)) * 0.25
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            if (colorRef.current === 'rainbow') {
              const time = window.performance.now() * 0.05
              const avgX = (p1.x + p2.x) / 2
              const avgY = (p1.y + p2.y) / 2
              const hue = Math.floor(Math.abs(avgX * 0.2 + avgY * 0.2 + time)) % 360
              ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`
              ctx.globalAlpha = alpha
            } else {
              ctx.strokeStyle = `rgb(${colorRef.current})` 
              ctx.globalAlpha = alpha
            }
            ctx.stroke()
            ctx.globalAlpha = 1.0
          }
        }
      }

      // Draw particles
      const time = window.performance.now() * 0.05
      for (let i = 0; i < TOTAL; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        if (colorRef.current === 'rainbow') {
          const hue = Math.floor(Math.abs(p.x * 0.2 + p.y * 0.2 + time)) % 360
          ctx.fillStyle = `hsl(${hue}, 80%, 60%)`
          ctx.globalAlpha = p.baseAlpha
        } else {
          ctx.fillStyle = `rgb(${colorRef.current})`
          ctx.globalAlpha = p.baseAlpha
        }
        ctx.fill()
        ctx.globalAlpha = 1.0
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  )
}
