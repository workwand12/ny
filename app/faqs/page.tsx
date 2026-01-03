export default function FAQsPage() {
  const faqs = [
    {
      q: 'What is included in the stay?',
      a: 'Each stay includes accommodation in an authentic Mongolian yurt, breakfast, access to shared facilities, and free parking.',
    },
    {
      q: 'Are the yurts heated?',
      a: 'Yes, each yurt has a wood-burning stove to keep you warm during Icelandic nights.',
    },
    {
      q: 'Is there WiFi?',
      a: 'Limited WiFi is available in common areas, encouraging you to disconnect and enjoy nature.',
    },
  ]

  return (
    <div className="pt-20">
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-serif text-charcoal mb-12 text-center">FAQs</h1>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate/20 pb-6">
                <h3 className="text-xl font-medium text-charcoal mb-2">{faq.q}</h3>
                <p className="text-slate">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

