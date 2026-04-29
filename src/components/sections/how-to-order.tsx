'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, ClipboardList, Truck, ExternalLink } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Browse Products',
    description: 'Choose from 50+ brands across dairy, sauces, beverages, pasta, snacks, and more.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    icon: MessageCircle,
    step: '02',
    title: 'Send Your Order',
    description: 'Contact us via phone, email, Facebook, or Instagram with your product list and volume.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Phone,
    step: '03',
    title: 'Confirm & Pay',
    description: 'We\'ll send you a quote. Review, confirm, and complete payment via bank transfer or check.',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: Truck,
    step: '04',
    title: 'We Deliver',
    description: 'Your order arrives at your door. Same-day or next-day delivery across Metro Manila.',
    color: 'bg-purple-500/10 text-purple-500',
  },
]

const channels = [
  { label: '8886-5949', href: 'tel:+6388865949', external: false, icon: '📞', sublabel: 'Landline' },
  { label: '0917-703-9672', href: 'tel:+639177039672', external: false, icon: '📱', sublabel: 'Mobile / Viber' },
  { label: 'ttdi.sales@gmail.com', href: 'mailto:ttdi.sales@gmail.com', external: false, icon: '✉️', sublabel: 'Email' },
  { label: 'Facebook', href: 'https://www.facebook.com/search/top/?q=Tip+Top+Distribution+Inc+Taguig', external: true, icon: '📘', sublabel: 'Message us' },
  { label: 'Instagram', href: 'https://www.instagram.com/', external: true, icon: '📸', sublabel: 'DM us' },
]

export function HowToOrder() {
  return (
    <section id="how-to-order" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              4 Steps. Stress-Free Ordering.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              No complicated forms. No minimum order hassle. Just tell us what you need — we handle the rest.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-16">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-emerald-500/40 via-border to-purple-500/40" />

          {steps.map((step, i) => (
            <ScrollAnimation key={step.step} delay={i * 0.12}>
              <div className="relative text-center group">
                <div className="relative inline-flex mb-5">
                  <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-500 z-20">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] sm:max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* CTA + Contact channels */}
        <ScrollAnimation delay={0.2}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-5 sm:p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-2">Ready to Order?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Reach us through any channel. We respond fast — usually within the hour during business hours.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50 border border-border hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:-translate-y-0.5 transition-all duration-200 text-left group"
                  >
                    <span className="text-xl">{ch.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate group-hover:text-emerald-500 transition-colors">{ch.label}</p>
                      <p className="text-xs text-muted-foreground">{ch.sublabel}</p>
                    </div>
                    {ch.external && <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto shrink-0" />}
                  </a>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2 h-12 text-base font-semibold shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <MessageCircle className="h-5 w-5" />
                Start Your Order Now
              </Button>

              <p className="text-xs text-muted-foreground mt-3">
                Business hours: Monday to Saturday, 8:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
