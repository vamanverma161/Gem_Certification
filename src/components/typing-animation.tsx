'use client'

import { useState, useEffect } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export function TypingAnimation({ text, speed = 100, onComplete }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [index, text, speed, onComplete])

  return (
    <span className="inline">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
