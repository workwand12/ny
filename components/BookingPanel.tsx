'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { useBookingPanel } from '@/hooks/useBookingPanel'

export function BookingPanel() {
  const { isOpen, closePanel } = useBookingPanel()
  const [activeTab, setActiveTab] = useState<'book' | 'availability' | 'contact'>('book')
  const [bookingUrl, setBookingUrl] = useState('https://booking.example.com')

  useEffect(() => {
    // Fetch booking URL from API
    fetch('/api/content/book_now_url')
      .then((res) => res.json())
      .then((data) => {
        if (data.value) setBookingUrl(data.value)
      })
      .catch(() => {})
  }, [])

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closePanel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-off-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-serif text-charcoal">Book Your Stay</h2>
                    <button
                      onClick={closePanel}
                      className="text-slate hover:text-charcoal"
                      aria-label="Close"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-1 mb-6 border-b border-slate/20">
                    <button
                      onClick={() => setActiveTab('book')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'book' ? 'text-moss border-b-2 border-moss' : 'text-slate'
                      }`}
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => setActiveTab('availability')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'availability' ? 'text-moss border-b-2 border-moss' : 'text-slate'
                      }`}
                    >
                      Check Availability
                    </button>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'contact' ? 'text-moss border-b-2 border-moss' : 'text-slate'
                      }`}
                    >
                      Contact
                    </button>
                  </div>

                  {/* Tab Content */}
                  {activeTab === 'book' && (
                    <div className="space-y-4">
                      <p className="text-slate">Book directly through our booking partner.</p>
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-charcoal text-off-white text-center py-3 rounded-2xl font-medium hover:bg-slate transition-colors"
                      >
                        Book Now
                      </a>
                    </div>
                  )}

                  {activeTab === 'availability' && (
                    <AvailabilityForm onClose={closePanel} />
                  )}

                  {activeTab === 'contact' && (
                    <ContactForm onClose={closePanel} />
                  )}
                </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function AvailabilityForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Submit form
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="checkin" className="block text-sm font-medium text-charcoal mb-1">
          Check-in
        </label>
        <input
          type="date"
          id="checkin"
          required
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>
      <div>
        <label htmlFor="checkout" className="block text-sm font-medium text-charcoal mb-1">
          Check-out
        </label>
        <input
          type="date"
          id="checkout"
          required
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>
      <div>
        <label htmlFor="guests" className="block text-sm font-medium text-charcoal mb-1">
          Guests
        </label>
        <input
          type="number"
          id="guests"
          min="1"
          max="8"
          defaultValue="2"
          required
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-charcoal text-off-white py-3 rounded-2xl font-medium hover:bg-slate transition-colors disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Availability'}
      </button>
    </form>
  )
}

function ContactForm({ onClose }: { onClose: () => void }) {
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
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-2 border border-slate/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-moss resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-charcoal text-off-white py-3 rounded-2xl font-medium hover:bg-slate transition-colors disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

