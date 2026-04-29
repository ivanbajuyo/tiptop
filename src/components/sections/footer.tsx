'use client'

import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

const MAKATI_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Erechem+Building,+V.A.+Rufino+corner+Salcedo+St.,+Makati+City,+Metro+Manila,+Philippines'
const TAGUIG_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=8003+Sta.+Maria+St.,+Taguig+City,+Metro+Manila,+Philippines'
const FACEBOOK_URL = 'https://www.facebook.com/search/top/?q=Tip+Top+Distribution+Inc+Taguig'
const INSTAGRAM_URL = 'https://www.instagram.com/'

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Products', href: '#products' },
      { label: 'Why Tip Top', href: '#strengths' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Locations', href: '#locations' },
      { label: 'Get in Touch', href: '#contact' },
      { label: 'Order on Facebook', href: FACEBOOK_URL, external: true },
      { label: 'Order on Instagram', href: INSTAGRAM_URL, external: true },
    ],
  },
]

export function Footer() {
  const handleClick = (href: string, external?: boolean) => {
    if (external || (!href.startsWith('#') && href !== '#')) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <button onClick={() => handleClick('#home')} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex flex-col items-center justify-center">
                <span className="text-white font-bold text-[11px] leading-none tracking-wider">TT</span>
                <span className="text-white/80 font-bold text-[10px] leading-none tracking-wider">DI</span>
              </div>
              <div>
                <span className="text-sm font-bold leading-none block">Tip Top Distribution</span>
                <span className="text-xs text-muted-foreground leading-none">Inc.</span>
              </div>
            </button>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
              A food service distribution company of market leader brands. Supplying
              restaurants, cafes, hotels, and food service operators with quality
              products at competitive bulk prices.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="tel:+6388865949" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                (02) 8886-5949
              </a>
              <a href="tel:+639177039672" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                0917-703-9672
              </a>
              <a href="mailto:ttdi.sales@gmail.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                ttdi.sales@gmail.com
              </a>
              <a
                href={MAKATI_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Head Office: Makati City</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={TAGUIG_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Warehouse: 8003 Sta. Maria St., Taguig City</span>
                <span className="sm:hidden">Warehouse: Taguig City</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleClick(link.href, link.external)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tip Top Distribution, Inc. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            SEC Reg: <span className="font-mono">A199723085</span> &bull; Taguig City, Metro Manila, Philippines
          </p>
        </div>
      </div>
    </footer>
  )
}
