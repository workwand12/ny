'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export function GalleryPreview() {
  const previewImages = [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
  ]

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-charcoal mb-4">Gallery</h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            A glimpse into life at Náttúra YÚRTEL
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {previewImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-slate/30" />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors z-10" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/gallery"
            className="inline-block px-8 py-4 border-2 border-charcoal text-charcoal rounded-2xl font-medium hover:bg-charcoal hover:text-off-white transition-colors"
          >
            View Full Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

