'use client'

import { useState, useEffect, useRef } from 'react'

const brands = [
  'Alaska', 'Angel', 'Clara Olé', 'McCormick', 'Twinings',
  'Ovaltine', 'San Remo', 'Barrio Fiesta', 'Nestlé', 'Lipton',
  'Datu Puti', 'Silver Swan', 'Mang Tomas', 'Royal', "Jack 'n Jill",
]

function Counter({ target, label, prefix = '', suffix = '', variant = 'dark' }: { target: number; label: string; prefix?: string; suffix?: string; variant?: 'dark' | 'light' }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = performance.now()

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  const isLight = variant === 'light'

  return (
    <div ref={ref} className="text-center">
      <div className={`text-2xl sm:text-3xl font-bold mb-0.5 ${isLight ? 'text-white' : 'text-emerald-500'}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className={`text-xs ${isLight ? 'text-emerald-200' : 'text-muted-foreground'}`}>{label}</div>
    </div>
  )
}

const brandCards = [
  {
    title: 'Dairy & Creamers',
    description: 'Evaporated milk, coffee creamers, and dairy essentials for cafes and restaurants.',
    brands: ['Alaska', 'Angel', 'Birch Tree', 'Nestlé'],
    emoji: '🥛',
  },
  {
    title: 'Syrups & Flavorings',
    description: 'Premium syrups, sauces, and seasonings for beverage and food preparation.',
    brands: ['Clara Olé', 'McCormick', 'Monin', 'Torani'],
    emoji: '🍯',
  },
  {
    title: 'Condiments & Sauces',
    description: 'Filipino favorites and international condiments for every kitchen.',
    brands: ['Barrio Fiesta', 'Datu Puti', 'Silver Swan', 'Mang Tomas'],
    emoji: '🫙',
  },
  {
    title: 'Beverages',
    description: 'Tea, coffee, malt drinks, and beverage concentrates in bulk.',
    brands: ['Twinings', 'Ovaltine', 'Lipton', 'Nestea'],
    emoji: '☕',
  },
  {
    title: 'Pasta & Grains',
    description: 'Pasta, rice, noodles, and grain products for food service operations.',
    brands: ['San Remo', 'Royal', 'Maggi', 'Lucky Me'],
    emoji: '🍝',
  },
  {
    title: 'Snacks & Confectionery',
    description: 'Chocolates, biscuits, chips, and confectionery for retail and hospitality.',
    brands: ['Oreo', "Jack 'n Jill", 'Cloud 9', 'Ricoa'],
    emoji: '🍫',
  },
]

export { Counter, brandCards, brands }
