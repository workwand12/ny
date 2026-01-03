'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function LocationPreview() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate/10 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center text-slate/50">
              <p>Map Integration</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-charcoal">Location</h2>
            <div className="space-y-4 text-lg text-slate">
              <p>
                Located in the heart of Iceland&apos;s Golden Circle, Náttúra YÚRTEL offers easy
                access to some of the country&apos;s most spectacular natural attractions.
              </p>
              <div className="space-y-2">
                <p className="font-medium text-charcoal">Nearby Attractions:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Geysir Hot Springs - 15 minutes</li>
                  <li>Gullfoss Waterfall - 20 minutes</li>
                  <li>Thingvellir National Park - 45 minutes</li>
                  <li>Reykjavik - 1.5 hours</li>
                </ul>
              </div>
            </div>
            <Link
              href="/location"
              className="inline-block px-8 py-4 bg-charcoal text-off-white rounded-2xl font-medium hover:bg-slate transition-colors"
            >
              View Full Location Details
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


