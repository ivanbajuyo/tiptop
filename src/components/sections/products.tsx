'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { brands, brandCards } from './shared-elements'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight } from 'lucide-react'

export function BrandLogosMarquee() {
  const doubledBrands = [...brands, ...brands]

  return (
    <section id="brands" className="py-12 border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-6">
            Trusted Brands We Distribute
          </p>
        </ScrollAnimation>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          <div className="flex animate-marquee">
            {doubledBrands.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex items-center justify-center min-w-[180px] px-6 py-3"
              >
                <span className="text-lg sm:text-xl font-semibold text-muted-foreground whitespace-nowrap hover:text-emerald-500 transition-colors cursor-default">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Products() {
  return (
    <section id="products" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Product Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What We Distribute
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              50+ market leader brands across 6 product categories — all sold by case in bulk,
              built for businesses that need consistent, reliable supply.
            </p>
          </div>
        </ScrollAnimation>

        {/* Category count bar */}
        <ScrollAnimation delay={0.05}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['6 Categories', '50+ Brands', 'Bulk / Case Orders', 'Metro Manila Delivery'].map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {tag}
              </span>
            ))}
          </div>
        </ScrollAnimation>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandCards.map((cat, i) => (
            <ScrollAnimation key={cat.title} delay={i * 0.1}>
              <div className="group h-full flex flex-col p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{cat.emoji}</div>
                  <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0">
                    Bulk
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-500 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Featured Brands
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.brands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="secondary"
                        className="text-xs bg-muted/50 hover:bg-emerald-500/10 hover:text-emerald-500"
                      >
                        {brand}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-auto gap-2 text-xs border-dashed hover:border-solid hover:bg-emerald-500/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  onClick={() =>
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Request Quote
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bulk notice + CTA */}
        <ScrollAnimation delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <div>
              <p className="text-sm font-semibold mb-1">All products sold by case (bulk only)</p>
              <p className="text-sm text-muted-foreground">
                We serve businesses, not individual consumers. Minimum order varies by product —{' '}
                <span className="font-medium text-foreground">contact us for pricing</span>.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 sm:shrink-0 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md shadow-emerald-500/20"
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <Phone className="h-4 w-4" />
              Get Pricing
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
