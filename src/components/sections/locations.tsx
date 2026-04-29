'use client'

import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Building2, Warehouse, Navigation, ExternalLink } from 'lucide-react'

const MAKATI_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Erechem+Building,+V.A.+Rufino+corner+Salcedo+St.,+Makati+City,+Metro+Manila,+Philippines'
const TAGUIG_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=8003+Sta.+Maria+St.,+Taguig+City,+Metro+Manila,+Philippines'
const TAGUIG_EMBED_URL = 'https://maps.google.com/maps?q=8003+Sta+Maria+St,+Taguig+City,+Metro+Manila,+Philippines&t=&z=16&ie=UTF8&iwloc=&output=embed'

const locations = [
  {
    icon: Building2,
    title: 'Head Office',
    address: 'Erechem Building, V.A. Rufino corner Salcedo St.',
    city: 'Makati City, Metro Manila',
    description: 'Corporate office handling business operations, partnerships, and administration.',
    badge: 'Head Office',
    directionsUrl: MAKATI_MAPS_URL,
  },
  {
    icon: Warehouse,
    title: 'Warehouse & Operations',
    address: '8003 Sta. Maria St.',
    city: 'Taguig City, Metro Manila, Philippines',
    description: 'Logistics hub for warehousing, inventory management, and distribution dispatch.',
    badge: 'Operations',
    hours: 'Monday to Saturday, 8:00 AM – 5:00 PM',
    directionsUrl: TAGUIG_MAPS_URL,
  },
]

export function Locations() {
  return (
    <section id="locations" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Our Presence
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Locations & Operations
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Corporate headquarters in Makati and warehouse operations in Taguig —
              strategically positioned for efficient food distribution across Metro Manila.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12">
          {locations.map((loc, i) => (
            <ScrollAnimation key={loc.title} delay={i * 0.15}>
              <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <loc.icon className="h-6 w-6 text-emerald-500" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {loc.badge}
                  </span>
                </div>

                <h3 className="font-semibold text-xl mb-3">{loc.title}</h3>

                <div className="space-y-3 flex-1">
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-emerald-500 transition-colors" />
                    <div>
                      <p className="text-sm font-medium group-hover:text-emerald-500 transition-colors">{loc.address}</p>
                      <p className="text-sm text-muted-foreground">{loc.city}</p>
                    </div>
                  </a>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {loc.description}
                  </p>

                  {loc.hours && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium">{loc.hours}</span>
                    </div>
                  )}
                </div>

                <a
                  href={loc.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 text-sm font-medium transition-colors hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Google Maps Embed */}
        <ScrollAnimation delay={0.2}>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-border">
            <iframe
              src={TAGUIG_EMBED_URL}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tip Top Distribution Inc. Warehouse - 8003 Sta. Maria St., Taguig City"
              className="w-full"
            />
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.3}>
          <div className="mt-8 p-4 rounded-lg bg-card border border-border text-center max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 inline-block mr-1 text-emerald-500" />
              Both locations provide strategic access to Metro Manila&apos;s major business districts
              for efficient food distribution.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
