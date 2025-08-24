"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Network nodes and connections
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
    }> = []

    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      time += 0.01

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.offsetWidth, node.x))
        node.y = Math.max(0, Math.min(canvas.offsetHeight, node.y))

        // Draw connections to nearby nodes
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3
            ctx.strokeStyle = `rgba(107, 91, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(otherNode.x, otherNode.y)
            ctx.stroke()
          }
        })

        // Draw node
        const pulseOpacity = node.opacity + Math.sin(time * 2 + i) * 0.1
        ctx.fillStyle = `rgba(107, 91, 255, ${pulseOpacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = "rgba(107, 91, 255, 0.5)"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ zIndex: -1 }}
    />
  )
}
