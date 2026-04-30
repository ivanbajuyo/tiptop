'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Phone, Package, Shield, Truck, Users, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeliveryIllustration } from './delivery-illustration'

const heroStats = [
  { target: 200, label: 'Businesses Served', sub: 'Restaurants, hotels & cafés', suffix: '+', icon: Users },
  { target: 50, label: 'Brand Partners', sub: 'Market leader brands', suffix: '+', icon: Shield },
  { target: 10, label: 'Years in Operations', sub: 'Trusted since day one', suffix: '+', icon: Clock },
  { target: 7, label: 'Days a Week Delivery', sub: 'Mon–Sat, 8AM–5PM', suffix: '', icon: Truck },
]

function HeroCounter({ target, label, sub, suffix }: { target: number; label: string; sub: string; suffix: string }) {
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
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
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

  return (
    <div ref={ref} className="text-center">
      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-0.5">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[11px] sm:text-xs text-emerald-200 font-medium">{label}</div>
      <div className="text-[9px] sm:text-[10px] text-emerald-300/80 mt-0.5">{sub}</div>
    </div>
  )
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start overflow-hidden"
    >
      {/* Background — overflow hidden stays here so decorative elements don't bleed */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-950/60 to-transparent z-[1]" />
      </div>

      {/* Content — NOT overflow-hidden so stats aren't clipped */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs sm:text-sm font-medium mb-5 sm:mb-6 backdrop-blur-sm"
            >
              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              SEC Registered &bull; Metro Manila
            </motion.div>

            {/* Primary headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[2.85rem] font-bold tracking-tight text-white leading-[1.12] mb-3 sm:mb-4"
            >
              Delivering Food Supplies to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
                Metro Manila Businesses
              </span>
            </motion.h1>

            {/* Accent subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="text-lg sm:text-2xl font-semibold text-white/90 mb-5 sm:mb-6"
            >
              Fast, Reliable, and Always in Stock.
            </motion.p>

            {/* Scannable value bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col gap-2.5 sm:gap-3 mb-7 sm:mb-8"
            >
              {[
                { text: '50+ trusted brands in stock', icon: Shield },
                { text: 'Competitive bulk pricing for businesses', icon: CheckCircle },
                { text: 'Same-day & next-day delivery', icon: Truck },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <span className="text-emerald-100 text-sm sm:text-base font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-white gap-2 px-6 sm:px-8 h-12 text-sm sm:text-base font-semibold shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.03] active:scale-[0.97]"
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Phone className="h-5 w-5" />
                Place an Order
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 px-6 sm:px-8 h-12 text-sm sm:text-base border border-white/25 text-white hover:bg-white/10 hover:text-white transition-all hover:scale-[1.03]"
                onClick={() =>
                  document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Package className="h-5 w-5" />
                <span>Browse Product Catalog</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT — Visual Anchor (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <DeliveryIllustration />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mt-12 sm:mt-16 lg:mt-12"
        >
          {heroStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-1 p-3 sm:p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 mb-0.5 sm:mb-1" />
              <HeroCounter target={stat.target} label={stat.label} sub={stat.sub} suffix={stat.suffix} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — only on larger screens where it's visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/70 cursor-pointer hover:text-white transition-colors"
          onClick={() =>
            document.querySelector('#brands')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
