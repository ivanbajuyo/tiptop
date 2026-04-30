'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { ArrowRight, Package, Truck, Warehouse, Handshake } from 'lucide-react'

const supplyChainSteps = [
  {
    icon: Package,
    label: 'Manufacturers / Brands',
    description: 'Source products from trusted food and beverage manufacturers',
    direction: 'right' as const,
  },
  {
    icon: Warehouse,
    label: 'Tip Top Distribution',
    description: 'Bulk procurement, warehousing, quality control',
    direction: 'right' as const,
    highlight: true,
  },
  {
    icon: Truck,
    label: 'Logistics & Delivery',
    description: 'Reliable delivery to business customers',
    direction: 'right' as const,
  },
  {
    icon: Handshake,
    label: 'Business Customers',
    description: 'Restaurants, cafes, hotels, food service operators',
    direction: 'none' as const,
  },
]

const keyFunctions = [
  {
    icon: Package,
    title: 'Bulk Procurement',
    description: 'Strategic purchasing from manufacturers at competitive rates, ensuring consistent supply and quality.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Managed warehouse facilities in Taguig for organized storage and inventory management.',
  },
  {
    icon: Truck,
    title: 'Logistics & Delivery',
    description: 'Reliable logistics network for timely delivery across Metro Manila and surrounding areas.',
  },
  {
    icon: Handshake,
    title: 'Brand Partnerships',
    description: 'Distribution partnerships with leading food and beverage brands in the Philippines.',
  },
]

export function BusinessModel() {
  return (
    <section id="business-model" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              How We Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              B2B Wholesale Distribution Model
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We follow a straightforward B2B wholesale model — connecting manufacturers
              directly to food service businesses.
            </p>
          </div>
        </ScrollAnimation>

        {/* Supply Chain Flow */}
        <ScrollAnimation>
          <div className="mb-16">
            <h3 className="text-lg font-semibold text-center mb-8">Supply Chain Flow</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {supplyChainSteps.map((step, i) => (
                <ScrollAnimation key={step.label} delay={i * 0.15}>
                  <div
                    className={`relative p-6 rounded-xl border transition-all duration-300 ${
                      step.highlight
                        ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                        : 'bg-card border-border hover:border-emerald-500/20'
                    }`}
                  >
                    {step.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-medium">
                        Us
                      </div>
                    )}
                    <div className={`p-3 rounded-lg w-fit mb-3 ${step.highlight ? 'bg-emerald-500/20' : 'bg-muted'}`}>
                      <step.icon className={`h-5 w-5 ${step.highlight ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{step.label}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Arrow between cards (desktop) */}
                  {i < supplyChainSteps.length - 1 && (
                    <div className="hidden lg:flex absolute right-[-1.25rem] top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="h-5 w-5 text-emerald-500/70" />
                    </div>
                  )}
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Key Functions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFunctions.map((fn, i) => (
            <ScrollAnimation key={fn.title} delay={i * 0.1}>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <fn.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">{fn.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{fn.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
