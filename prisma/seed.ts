import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed content
  await prisma.content.upsert({
    where: { key: 'hero_title' },
    update: {},
    create: {
      key: 'hero_title',
      value: 'Experience Iceland\'s Golden Circle',
    },
  })

  await prisma.content.upsert({
    where: { key: 'hero_subtitle' },
    update: {},
    create: {
      key: 'hero_subtitle',
      value: 'Custom-made yurts, handcrafted in Mongolia and nestled in the heart of Iceland\'s wilderness',
    },
  })

  await prisma.content.upsert({
    where: { key: 'story_title' },
    update: {},
    create: {
      key: 'story_title',
      value: 'Our Story',
    },
  })

  await prisma.content.upsert({
    where: { key: 'story_text' },
    update: {},
    create: {
      key: 'story_text',
      value: 'Náttúra YÚRTEL offers an authentic Mongolian yurt experience in the heart of Iceland\'s Golden Circle. Each yurt is handcrafted using traditional techniques, providing a unique connection to nature while maintaining comfort and warmth.',
    },
  })

  await prisma.content.upsert({
    where: { key: 'book_now_url' },
    update: {},
    create: {
      key: 'book_now_url',
      value: 'https://booking.example.com',
    },
  })

  // Seed gallery images
  const galleryImages = [
    { url: '/images/gallery-1.jpg', alt: 'Yurt exterior at sunset', order: 1 },
    { url: '/images/gallery-2.jpg', alt: 'Cozy yurt interior', order: 2 },
    { url: '/images/gallery-3.jpg', alt: 'Northern lights over yurts', order: 3 },
    { url: '/images/gallery-4.jpg', alt: 'Icelandic landscape', order: 4 },
    { url: '/images/gallery-5.jpg', alt: 'Yurt breakfast table', order: 5 },
    { url: '/images/gallery-6.jpg', alt: 'Aurora viewing', order: 6 },
  ]

  for (const image of galleryImages) {
    await prisma.galleryImage.create({
      data: image,
    }).catch(() => {
      // Ignore duplicates
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

