'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useBookingPanel } from '@/hooks/useBookingPanel'

export function BookingButton() {
  const { openPanel } = useBookingPanel()

  return (
    <>
      {/* Desktop - Bottom Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openPanel}
        className="hidden lg:fixed bottom-8 right-8 z-40 bg-charcoal text-off-white px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open booking panel"
      >
        Book
      </motion.button>

      {/* Mobile - Bottom Sticky Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal text-off-white p-4 shadow-2xl"
      >
        <button
          onClick={openPanel}
          className="w-full bg-off-white text-charcoal py-3 rounded-2xl text-base font-medium"
          aria-label="Open booking panel"
        >
          Book Now
        </button>
      </motion.div>
    </>
  )
}

