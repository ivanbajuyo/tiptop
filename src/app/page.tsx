'use client'

import { Navbar, FloatingOrderButton } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { BrandLogosMarquee, Products } from '@/components/sections/products'
import { About } from '@/components/sections/about'
import { CTABanner } from '@/components/sections/cta-banner'
import { HowToOrder } from '@/components/sections/how-to-order'
import { Testimonials } from '@/components/sections/testimonials'
import { Strengths } from '@/components/sections/strengths'
import { Locations } from '@/components/sections/locations'
import { FAQ } from '@/components/sections/faq'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* 1. HERO — value-driven first impression + stats */}
        <Hero />

        {/* 2. BRAND LOGOS — instant credibility */}
        <BrandLogosMarquee />

        {/* 3. PRODUCTS — the core offering */}
        <Products />

        {/* 4. CTA — push to action after seeing products */}
        <CTABanner
          variant="dark"
          title="Ready to Stock Up?"
          description="Get competitive bulk pricing for your business. 50+ brands, one call away."
          btnText="Request a Quote"
        />

        {/* 5. HOW IT WORKS — clear ordering process */}
        <HowToOrder />

        {/* 6. TESTIMONIALS — social proof */}
        <Testimonials />

        {/* 7. WHY CHOOSE US — differentiation */}
        <Strengths />

        {/* 8. ABOUT — company credibility */}
        <About />

        {/* 9. CTA — second push */}
        <CTABanner
          title="Stop Worrying About Supply."
          description="Join 200+ businesses that trust Tip Top for their daily operations."
          btnText="Contact Us Today"
        />

        {/* 10. LOCATIONS — where we are */}
        <Locations />

        {/* 11. FAQ — address objections */}
        <FAQ />

        {/* 12. CONTACT — close the deal */}
        <Contact />
      </main>
      <Footer />
      <FloatingOrderButton />
    </div>
  )
}
