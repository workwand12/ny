import { prisma } from './prisma'

// Default content fallbacks for when database is unavailable (e.g., during build)
const DEFAULT_CONTENT: Record<string, string> = {
  hero_title: "Experience Iceland's Golden Circle",
  hero_subtitle: "Custom-made yurts, handcrafted in Mongolia and nestled in the heart of Iceland's wilderness",
  story_title: "Our Story",
  story_text: "Náttúra YÚRTEL offers an authentic Mongolian yurt experience in the heart of Iceland's Golden Circle. Each yurt is handcrafted using traditional techniques, providing a unique connection to nature while maintaining comfort and warmth.",
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

export async function updateContent(key: string, value: string) {
  return prisma.content.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
}


