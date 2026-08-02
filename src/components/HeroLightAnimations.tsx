import { useEffect, useRef } from 'react'

interface Props {
  color?: string
}

export default function HeroNetworkAnimation({ color: _color = '100, 116, 139' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pausedRef = useRef(false)

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

    const TOTAL = 180

    const colors = [
      '66, 133, 244',
      '234, 67, 53',
      '251, 188, 5',
      '52, 168, 83',
    ]

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      baseAlpha: number
      color: string
    }

    const particles: Particle[] = []

    const initParticle = (): Particle => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const isLeft = Math.random() > 0.5
      let x, y
      if (isLeft) {
        x = Math.pow(Math.random(), 3) * (w * 0.4)
        y = Math.random() * h
      } else {
        x = Math.random() * w
        y = h - Math.pow(Math.random(), 3) * (h * 0.5)
      }
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 1.5 + Math.random() * 2.5,
        baseAlpha: 0.3 + Math.random() * 0.7,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    }

    for (let i = 0; i < TOTAL; i++) {
      particles.push(initParticle())
    }

    const CONN_DIST = 140
    const CONN_DIST_SQ = CONN_DIST * CONN_DIST
    const MAX_REPEL_DIST = 150
    const MAX_REPEL_DIST_SQ = MAX_REPEL_DIST * MAX_REPEL_DIST

    let mouse = { x: -1000, y: -1000 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseout', onMouseLeave)

    const onVisibilityChange = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting || document.hidden
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < TOTAL; i++) {
        const p = particles[i]

        const dxM = p.x - mouse.x
        const dyM = p.y - mouse.y
        const distToMouseSq = dxM * dxM + dyM * dyM

        if (distToMouseSq < MAX_REPEL_DIST_SQ && distToMouseSq > 0) {
          const distToMouse = Math.sqrt(distToMouseSq)
          const force = (MAX_REPEL_DIST - distToMouse) / MAX_REPEL_DIST
          p.x += (dxM / distToMouse) * force * 2.5
          p.y += (dyM / distToMouse) * force * 2.5
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          Object.assign(p, initParticle())
        }
      }

      ctx.lineWidth = 1.0
      for (let i = 0; i < TOTAL; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < TOTAL; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < CONN_DIST_SQ) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / CONN_DIST) * 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`
            ctx.stroke()
          }
        }

        const distToMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y)
        if (distToMouse < CONN_DIST) {
          const alpha = (1 - distToMouse / CONN_DIST) * 0.6
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`
          ctx.stroke()
        }
      }

      for (let i = 0; i < TOTAL; i++) {
        const p = particles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`
        ctx.fill()
      }

      if (!pausedRef.current) {
        animId = requestAnimationFrame(draw)
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseout', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      observer.disconnect()
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
