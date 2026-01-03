import { Amenities } from '@/components/sections/Amenities'
import { motion } from 'framer-motion'

export default function StayPage() {
  return (
    <div className="pt-20">
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-serif text-charcoal mb-6">Your Stay</h1>
          <p className="text-xl text-slate max-w-2xl mx-auto">
            Experience authentic Mongolian yurts in the heart of Iceland&apos;s wilderness
          </p>
        </div>
      </section>
      <Amenities />
      {/* Additional stay content */}
    </div>
  )
}

