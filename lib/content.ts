import { prisma } from './prisma'

// Default content fallbacks for when database is unavailable (e.g., during build)
const DEFAULT_CONTENT: Record<string, string> = {
  hero_title: "Experience Iceland's Golden Circle",
  hero_subtitle: "Custom-made yurts, handcrafted in Mongolia and nestled in the heart of Iceland's wilderness",
  hero_image: "/images/hero.jpg",
  story_title: "Our Story",
  story_text: "Náttúra YÚRTEL offers an authentic Mongolian yurt experience in the heart of Iceland's Golden Circle. Each yurt is handcrafted using traditional techniques, providing a unique connection to nature while maintaining comfort and warmth.",
  story_image: "/images/story.jpg",
  amenities_title: "Amenities",
  amenities_subtitle: "Everything you need for a comfortable and memorable stay",
  experience_title: "The Experience",
  experience_subtitle: "Discover the wonders of Iceland from your cozy yurt base",
  gallery_title: "Gallery",
  gallery_subtitle: "A glimpse into life at Náttúra YÚRTEL",
  location_title: "Location",
  location_text: "Located in the heart of Iceland's Golden Circle, Náttúra YÚRTEL offers easy access to some of the country's most spectacular natural attractions.",
  location_attractions: "Geysir Hot Springs - 15 minutes\nGullfoss Waterfall - 20 minutes\nThingvellir National Park - 45 minutes\nReykjavik - 1.5 hours",
  stay_title: "Your Stay",
  stay_subtitle: "Experience authentic Mongolian yurts in the heart of Iceland's wilderness",
  contact_title: "Contact",
  faqs_title: "FAQs",
  book_now_url: "https://booking.example.com",
}

export async function getContent(key: string): Promise<string> {
  try {
    const content = await prisma.content.findUnique({
      where: { key },
    })
    return content?.value || DEFAULT_CONTENT[key] || ''
  } catch (error) {
    // Database unavailable (e.g., during build) - return default
    console.warn(`[Content] Database unavailable, using default for "${key}"`, error)
    return DEFAULT_CONTENT[key] || ''
  }
}

export async function getAllContent(): Promise<Record<string, string>> {
  try {
    const contents = await prisma.content.findMany()
    return contents.reduce((acc, content) => {
      acc[content.key] = content.value
      return acc
    }, {} as Record<string, string>)
  } catch (error) {
    // Database unavailable - return defaults
    console.warn('[Content] Database unavailable, using defaults', error)
    return DEFAULT_CONTENT
  }
}

export async function updateContent(key: string, value: string, type: string = 'text', section?: string) {
  return prisma.content.upsert({
    where: { key },
    update: { value, type, section },
    create: { key, value, type, section },
  })
}

export async function getContentBySection(section: string): Promise<Record<string, string>> {
  try {
    const contents = await prisma.content.findMany({
      where: { section },
    })
    return contents.reduce((acc, content) => {
      acc[content.key] = content.value
      return acc
    }, {} as Record<string, string>)
  } catch (error) {
    console.warn(`[Content] Database unavailable for section "${section}"`, error)
    return {}
  }
}


