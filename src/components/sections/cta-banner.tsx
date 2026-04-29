'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTABanner({ title, description, btnText, variant = 'default' }: {
  title: string
  description: string
  btnText: string
  variant?: 'default' | 'compact' | 'dark'
}) {
  const isDark = variant === 'dark'

  return (
    <ScrollAnimation>
      <div className={`py-12 sm:py-16 ${isDark ? 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950' : ''}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 p-5 sm:p-8 rounded-2xl border transition-shadow duration-300 hover:shadow-xl ${
            isDark
              ? 'bg-emerald-900/50 border-emerald-700/30'
              : 'bg-emerald-500/5 border-emerald-500/20'
          }`}>
            <div className="text-center sm:text-left">
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : ''}`}>{title}</h3>
              <p className={isDark ? 'text-emerald-100' : 'text-muted-foreground'}>{description}</p>
            </div>
            <Button
              size="lg"
              className={`${isDark ? 'bg-white text-emerald-900 hover:bg-emerald-50' : 'bg-emerald-500 hover:bg-emerald-600 text-white'} gap-2 shrink-0 font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all`}
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {btnText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  )
}
