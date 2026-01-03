'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface StoryProps {
  title: string
  text: string
}

export function Story({ title, text }: StoryProps) {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-serif text-charcoal">{title}</h2>
            <div className="space-y-4 text-lg text-slate leading-relaxed">
              <p>{text}</p>
              <p>
                Experience the unique blend of traditional Mongolian craftsmanship and Icelandic
                wilderness. Our yurts provide a warm, comfortable base for exploring the natural
                wonders of the Golden Circle.
              </p>
            </div>
          </motion.div>

          {/* Image - Overlapping */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:-ml-12"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/story.jpg"
                alt="Traditional yurt interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-moss/10 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


