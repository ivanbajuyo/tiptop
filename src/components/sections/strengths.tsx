'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Store, UtensilsCrossed, Hotel, ShoppingBag, Handshake, Truck, Clock, Shield, DollarSign, Headphones } from 'lucide-react'

const targetCustomers = [
  { icon: UtensilsCrossed, title: 'Restaurants & Fast Food', description: 'Consistent daily supply so you never run out during peak service hours.' },
  { icon: Store, title: 'Cafes & Beverage Shops', description: 'Dairy, syrups, tea, and specialty products for your beverage program.' },
  { icon: Hotel, title: 'Hotels & Catering', description: 'Premium products for hospitality — from breakfast buffets to event catering.' },
  { icon: ShoppingBag, title: 'Small Food Businesses', description: 'Affordable bulk pricing designed to support growing food entrepreneurs.' },
  { icon: Handshake, title: 'Grocery Resellers', description: 'Case-based wholesale pricing for retail distribution businesses.' },
]

const whyChooseUs = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day and next-day delivery across Metro Manila. We know delays cost you money.',
  },
  {
    icon: Shield,
    title: 'Always in Stock',
    description: '95%+ stock availability rate. We maintain deep inventory so you don\'t have to worry.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Bulk Pricing',
    description: 'Volume-based pricing designed for business profitability. The more you order, the better the rate.',
  },
  {
    icon: Clock,
    title: 'Consistent & Reliable',
    description: 'Trusted by 200+ businesses for weekly recurring orders. Consistency is our promise.',
  },
  {
    icon: Headphones,
    title: 'Responsive Support',
    description: 'Direct line to our sales team. We respond fast — usually within the hour.',
  },
  {
    icon: Store,
    title: '50+ Brand Partners',
    description: 'One supplier for all your needs. From Alaska to McCormick to Nestlé — we carry the brands your customers expect.',
  },
]

export function Strengths() {
  return (
    <section id="strengths" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Who We Serve */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Who We Serve
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for Food Businesses
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              If your business needs consistent supply of branded ingredients in volume, we&apos;re your partner.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-24">
          {targetCustomers.map((customer, i) => (
            <ScrollAnimation key={customer.title} delay={i * 0.08}>
              <div className="group h-full p-5 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-emerald-500/20 transition-colors">
                  <customer.icon className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5 group-hover:text-emerald-500 transition-colors">
                  {customer.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {customer.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Why Choose Tip Top */}
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Why Choose Tip Top
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What Sets Us Apart
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              We&apos;re not just another distributor. Here&apos;s why businesses stay with us year after year.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {whyChooseUs.map((item, i) => (
            <ScrollAnimation key={item.title} delay={i * 0.08}>
              <div className="p-6 rounded-xl bg-card border border-border hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-11 h-11 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <item.icon className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Disclaimer */}
        <ScrollAnimation delay={0.2}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="p-5 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground text-center">
                <strong className="text-foreground">Note:</strong> Tip Top Distribution, Inc. is not affiliated with
                REMA Tip Top (industrial/mining) or Tip Top Textile (manufacturing). We are exclusively
                a food service distribution company. SEC Reg: A199723085.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
