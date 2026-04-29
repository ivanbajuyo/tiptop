'use client'

import { useState } from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, MapPin, Clock, Phone, Send, CheckCircle, Loader2, Facebook, Instagram, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

const MAKATI_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Erechem+Building,+V.A.+Rufino+corner+Salcedo+St.,+Makati+City,+Metro+Manila,+Philippines'
const TAGUIG_MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=8003+Sta.+Maria+St.,+Taguig+City,+Metro+Manila,+Philippines'
const FACEBOOK_URL = 'https://www.facebook.com/search/top/?q=Tip+Top+Distribution+Inc+Taguig'
const INSTAGRAM_URL = 'https://www.instagram.com/'

// Backend API URL — uses Render backend in production, local API in development
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

function getContactApiUrl() {
  if (BACKEND_URL) {
    // Production: call Render backend
    return `${BACKEND_URL}/api/contact`
  }
  // Development: call local Next.js API route (fallback)
  return '/api/contact'
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Head Office',
    value: 'Erechem Building, V.A. Rufino cor. Salcedo St., Makati City',
    href: MAKATI_MAPS_URL,
    external: true,
  },
  {
    icon: MapPin,
    label: 'Warehouse & Operations',
    value: '8003 Sta. Maria St., Taguig City, Metro Manila',
    href: TAGUIG_MAPS_URL,
    external: true,
  },
  {
    icon: Clock,
    label: 'Operating Hours',
    value: 'Monday to Saturday, 8:00 AM – 5:00 PM',
    href: null,
  },
  {
    icon: Phone,
    label: 'Landline',
    value: '8886-5949',
    href: 'tel:+6388865949',
  },
  {
    icon: Phone,
    label: 'Mobile',
    value: '0917-703-9672',
    href: 'tel:+639177039672',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ttdi.sales@gmail.com',
    href: 'mailto:ttdi.sales@gmail.com',
  },
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch(getContactApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSubmitted(true)
        toast.success('Inquiry sent successfully! We\'ll get back to you soon.')
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setIsSubmitted(false), 3000)
      } else {
        const errData = await res.json()
        toast.error(errData.error || 'Failed to send inquiry. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Place an Order or Inquire
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Ready to order or need more information? Reach out via phone, email, or
              send us a message below.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <ScrollAnimation direction="left" className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((item) => {
                if (!item.href) {
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-sm transition-shadow duration-300"
                    >
                      <div className="p-3 rounded-lg bg-emerald-500/10 shrink-0">
                        <item.icon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-sm">{item.value}</p>
                      </div>
                    </div>
                  )
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      <item.icon className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-sm">{item.value}</p>
                    </div>
                    {item.external && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 transition-colors shrink-0 mt-1" />
                    )}
                  </a>
                )
              })}

              {/* Social / Online Ordering */}
              <div className="p-6 rounded-xl bg-card border border-border mt-4 hover:shadow-sm transition-shadow duration-300">
                <h3 className="font-semibold mb-3">Order Online</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We also accept orders through our social media channels.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-all hover:scale-[1.02] text-sm font-medium"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#f09433]/10 via-[#e6683c]/10 to-[#bc1888]/10 text-[#E1306C] hover:from-[#f09433]/20 hover:via-[#e6683c]/20 hover:to-[#bc1888]/20 transition-all hover:scale-[1.02] text-sm font-medium"
                  >
                    <Instagram className="h-4 w-4" />
                    Instagram
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:shadow-sm transition-shadow duration-300">
                <h3 className="font-semibold mb-2">SEC Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Tip Top Distribution, Inc. is a registered Philippine corporation.
                  <br />
                  <span className="font-mono text-xs mt-1 inline-block">SEC No: A199723085</span>
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation direction="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-card border border-border hover:shadow-sm transition-shadow duration-300">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Business Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Your business name"
                    required
                    className="bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2 mb-6">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your needs — products you're interested in, estimated volume, delivery area, etc."
                  rows={5}
                  required
                  className="bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Inquiry Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
