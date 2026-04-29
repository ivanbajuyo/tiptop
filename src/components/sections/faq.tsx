'use client'

import { useState } from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is the minimum order quantity?',
    answer: 'All products are sold by case (bulk). The minimum order varies by product category. Contact our sales team at 0917-703-9672 or ttdi.sales@gmail.com for specific product MOQs.',
  },
  {
    question: 'What areas do you deliver to?',
    answer: 'We primarily deliver within Metro Manila and surrounding areas. For deliveries outside our standard coverage, please contact us to discuss logistics options.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, checks, and other standard B2B payment terms. Payment terms can be discussed with our sales team based on your business relationship and order volume.',
  },
  {
    question: 'How do I place an order?',
    answer: 'You can order through multiple channels: call our landline (8886-5949) or mobile (0917-703-9672), email us at ttdi.sales@gmail.com, or send us a message on Facebook or Instagram.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'We are open Monday to Saturday, 8:00 AM to 5:00 PM. Orders placed outside business hours will be processed the next working day.',
  },
  {
    question: 'Do you offer credit terms for businesses?',
    answer: 'Yes, we offer flexible payment terms for established business accounts. Contact our sales team to discuss credit terms and account setup.',
  },
  {
    question: 'Can I order through social media?',
    answer: 'Absolutely! We accept orders through both Facebook and Instagram. Simply send us a direct message with your product requirements and we\'ll process your order promptly.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-emerald-500/20 hover:shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors min-h-[44px]"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-500' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
          {answer}
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-emerald-500 uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Common questions about ordering, delivery, and doing business with Tip Top Distribution.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <ScrollAnimation key={faq.question} delay={i * 0.05}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
