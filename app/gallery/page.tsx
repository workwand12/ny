export default async function GalleryPage() {
  // In real implementation, fetch from API
  const images: Array<{ url: string; alt: string | null }> = []

  return (
    <div className="pt-20">
      <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif text-charcoal mb-4">Gallery</h1>
            <p className="text-lg text-slate max-w-2xl mx-auto">
              A glimpse into life at Náttúra YÚRTEL
            </p>
          </div>
          {/* Gallery grid */}
        </div>
      </section>
    </div>
  )
}

