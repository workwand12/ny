'use client'

import { motion } from 'framer-motion'

const amenities = [
  { icon: '🏕️', title: 'Authentic Mongolian Yurts', description: 'Handcrafted using traditional techniques' },
  { icon: '🔥', title: 'Wood-burning Stove', description: 'Stay warm during Icelandic nights' },
  { icon: '🛏️', title: 'Comfortable Bedding', description: 'Premium linens for a restful sleep' },
  { icon: '☕', title: 'Breakfast Included', description: 'Local Icelandic breakfast each morning' },
  { icon: '🌌', title: 'Aurora Viewing', description: 'Prime location for Northern Lights' },
  { icon: '🚿', title: 'Shared Facilities', description: 'Modern bathrooms and kitchen access' },
]

export function Amenities() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-charcoal mb-4">Amenities</h2>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Everything you need for a comfortable and memorable stay
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-off-white p-8 rounded-2xl border border-slate/10 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{amenity.icon}</div>
              <h3 className="text-xl font-medium text-charcoal mb-2">{amenity.title}</h3>
              <p className="text-slate">{amenity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


