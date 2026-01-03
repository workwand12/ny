'use client'

import { useState } from 'react'
import { useBookingPanel } from '@/hooks/useBookingPanel'

export default function ContactPage() {
  const { openPanel } = useBookingPanel()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        enquiryType: 'contact',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    setLoading(false)
    alert('Message sent!')
  }

  return (
    <div className="pt-20">
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-serif text-charcoal mb-12 text-center">Contact</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-charcoal text-off-white py-4 rounded-2xl font-medium hover:bg-slate transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <div className="mt-12 text-center">
            <p className="text-slate mb-4">Or book directly:</p>
            <button
              onClick={openPanel}
              className="px-8 py-4 bg-charcoal text-off-white rounded-2xl font-medium hover:bg-slate transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}


