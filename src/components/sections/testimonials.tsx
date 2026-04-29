'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Star, Quote, Building2 } from 'lucide-react'

const testimonials = [
  {
    name: 'Chef Roberto Cruz',
    role: 'Executive Chef, Grand Manila Hotel',
    content: 'We switched to Tip Top two years ago. Deliveries are always on time, stock is consistent, and their pricing is genuinely competitive. Never had a single stock-out issue.',
    rating: 5,
    highlight: 'Never had a single stock-out issue.',
  },
  {
    name: 'Maria Santos',
    role: 'Owner, Café Mocha (3 branches)',
    content: 'Running three cafes means I need a supplier who scales. Tip Top handles all three locations without missing a beat. Their team is always just one call away.',
    rating: 5,
    highlight: 'Handles all three locations without missing a beat.',
  },
  {
    name: 'James Villanueva',
    role: 'Operations Manager, QuickBite Foods Inc.',
    content: 'For a chain with 12 stores, supply consistency is everything. Tip Top delivers that. No drama, no excuses — just reliable service week after week.',
    rating: 5,
    highlight: 'No drama, no excuses — reliable week after week.',
  },
  {
    name: 'Anna Lim',
    role: 'Owner, Villa Catering Services',
    content: 'Large events need suppliers who can deliver volume fast. Tip Top has come through for us every single time — even on rush orders. They truly live up to their name.',
    rating: 5,
    highlight: 'Even on rush orders — they deliver.',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Trusted by Real Businesses
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Don&apos;t take our word for it. Here&apos;s what restaurant owners, chefs, and operations managers say.
            </p>
          </div>
        </ScrollAnimation>

        {/* Trust bar */}
        <ScrollAnimation delay={0.05}>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              '200+ Active Clients',
              '95% Retention Rate',
              '4.9/5 Client Rating',
              'Metro Manila Coverage',
            ].map((tag) => (
              <span key={tag} className="text-sm font-medium text-muted-foreground">
                <span className="text-emerald-500 mr-1.5">●</span>{tag}
              </span>
            ))}
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <ScrollAnimation key={testimonial.name} delay={i * 0.1}>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Quote className="h-6 w-6 text-emerald-500/50" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                </div>

                {/* Highlight */}
                <p className="text-lg font-semibold text-foreground mb-3 leading-snug">
                  &ldquo;{testimonial.highlight}&rdquo;
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center text-sm font-semibold text-emerald-500 shrink-0">
                    {testimonial.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                      <Building2 className="h-3 w-3 shrink-0" />
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
