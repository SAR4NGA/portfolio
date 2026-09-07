import { useEffect, useRef, useState } from 'react'

type Segment = { text: string; className?: string }

interface TypewriterProps {
  segments: Segment[]
  speed?: number
  startDelay?: number
  className?: string
  style?: React.CSSProperties
  cursorClassName?: string
  cursorSizeClass?: string
  as?: 'span' | 'div' | 'p'
  onComplete?: () => void
}

export default function Typewriter({
  segments,
  speed = 50,
  startDelay = 0,
  className,
  style,
  cursorClassName,
  cursorSizeClass,
  as = 'span',
  onComplete,
}: TypewriterProps) {
  const Root = as as 'span'
  const totalLength = segments.reduce((sum, seg) => sum + seg.text.length, 0)
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const [hideCursor, setHideCursor] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((prev) => {
          const next = prev + 1
          if (next >= totalLength) {
            window.clearInterval(interval)
            setDone(true)
            onCompleteRef.current?.()
            return totalLength
          }
          return next
        })
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(start)
      if (interval !== undefined) window.clearInterval(interval)
    }
  }, [totalLength, speed, startDelay])

  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(() => setHideCursor(true), 1000)
    return () => window.clearTimeout(timer)
  }, [done])

  let remaining = count

  return (
    <Root className={className} style={style}>
      {segments.map((seg, i) => {
        const visible = Math.max(0, Math.min(seg.text.length, remaining))
        remaining -= seg.text.length
        return (
          <span key={i} className={seg.className}>
            {seg.text.slice(0, visible)}
          </span>
        )
      })}
      <span
        aria-hidden
        className={`ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] ${cursorSizeClass ?? ''} ${hideCursor ? '' : 'animate-cursor-blink'} ${cursorClassName ?? ''}`}
        style={{ opacity: hideCursor ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </Root>
  )
}
