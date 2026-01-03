'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const experiences = [
  {
    title: 'Northern Lights',
    description: 'Witness the aurora borealis from your yurt',
    image: '/images/aurora.jpg',
  },
  {
    title: 'Golden Circle',
    description: 'Explore geysers, waterfalls, and national parks',
    image: '/images/golden-circle.jpg',
  },
  {
    title: 'Wildlife Watching',
    description: 'Icelandic horses, birds, and arctic foxes',
    image: '/images/wildlife.jpg',
  },
]

export function Experience() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-charcoal mb-4">The Experience</h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Discover the wonders of Iceland from your cozy yurt base
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent z-10" />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-off-white">
                <h3 className="text-2xl font-serif mb-2">{exp.title}</h3>
                <p className="text-off-white/90">{exp.description}</p>
              </div>
              <div className="absolute inset-0 bg-slate/20 group-hover:bg-slate/10 transition-colors z-30" />
              {/* Placeholder for image */}
              <div className="absolute inset-0 bg-slate/30" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/experience"
            className="inline-block px-8 py-4 bg-charcoal text-off-white rounded-2xl font-medium hover:bg-slate transition-colors"
          >
            Explore More Experiences
          </Link>
        </motion.div>
      </div>
    </section>
  )
}


