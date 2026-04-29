'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Counter } from './shared-elements'
import { Building2, FileText, MapPin, Clock, Target, Eye, Heart, Zap } from 'lucide-react'

const stats = [
  { target: 200, label: 'Active Business Clients', suffix: '+', icon: Building2 },
  { target: 50, label: 'Brand Partners', suffix: '+', icon: FileText },
  { target: 6, label: 'Product Categories', suffix: '', icon: MapPin },
  { target: 95, label: 'Client Retention Rate', suffix: '%', icon: Clock },
]

const missionVision = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To provide reliable, efficient, and consistent food service distribution — ensuring branded products are always available when your kitchen needs them.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To be the most dependable distribution partner in the Philippines, supporting the growth of food businesses through quality, convenience, and service.',
  },
  {
    icon: Zap,
    title: 'Our Promise',
    description: 'A stress-free experience from your first order to your hundredth. Fast delivery, competitive pricing, and zero stock-out headaches.',
  },
]

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              About Tip Top Distribution
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Your Dependable Distribution Partner
            </h2>
          </div>
        </ScrollAnimation>

        {/* Company Description */}
        <ScrollAnimation delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-center text-muted-foreground leading-relaxed text-lg">
              Tip Top Distribution Inc. is a Taguig-based food service distributor specializing in branded
              consumer products for{' '}
              <strong className="text-foreground">hotels, restaurants, cafes, and food businesses</strong>.
              We carry 50+ market leader brands across dairy, sauces, beverages, pasta, and more — all
              delivered in bulk at competitive pricing.
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats */}
        <ScrollAnimation delay={0.15}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl bg-card border border-border hover:border-emerald-500/20 hover:shadow-md transition-all duration-300">
                <Counter target={stat.target} label={stat.label} suffix={stat.suffix} />
              </div>
            ))}
          </div>
        </ScrollAnimation>

        {/* Mission / Vision / Promise */}
        <div className="grid sm:grid-cols-3 gap-6">
          {missionVision.map((item, i) => (
            <ScrollAnimation key={item.title} delay={i * 0.1}>
              <div className="group h-full p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <item.icon className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
