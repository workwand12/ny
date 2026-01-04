import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed hero content
  await prisma.content.upsert({
    where: { key: 'hero_title' },
    update: {},
    create: {
      key: 'hero_title',
      value: 'Experience Iceland\'s Golden Circle',
      type: 'text',
      section: 'hero',
    },
  })

  await prisma.content.upsert({
    where: { key: 'hero_subtitle' },
    update: {},
    create: {
      key: 'hero_subtitle',
      value: 'Custom-made yurts, handcrafted in Mongolia and nestled in the heart of Iceland\'s wilderness',
      type: 'text',
      section: 'hero',
    },
  })

  await prisma.content.upsert({
    where: { key: 'hero_image' },
    update: {},
    create: {
      key: 'hero_image',
      value: '/images/hero.jpg',
      type: 'image',
      section: 'hero',
    },
  })

  // Seed story content
  await prisma.content.upsert({
    where: { key: 'story_title' },
    update: {},
    create: {
      key: 'story_title',
      value: 'Our Story',
      type: 'text',
      section: 'story',
    },
  })

  await prisma.content.upsert({
    where: { key: 'story_text' },
    update: {},
    create: {
      key: 'story_text',
      value: 'Náttúra YÚRTEL offers an authentic Mongolian yurt experience in the heart of Iceland\'s Golden Circle. Each yurt is handcrafted using traditional techniques, providing a unique connection to nature while maintaining comfort and warmth.',
      type: 'text',
      section: 'story',
    },
  })

  await prisma.content.upsert({
    where: { key: 'story_image' },
    update: {},
    create: {
      key: 'story_image',
      value: '/images/story.jpg',
      type: 'image',
      section: 'story',
    },
  })

  // Seed amenities content
  await prisma.content.upsert({
    where: { key: 'amenities_title' },
    update: {},
    create: {
      key: 'amenities_title',
      value: 'Amenities',
      type: 'text',
      section: 'amenities',
    },
  })

  await prisma.content.upsert({
    where: { key: 'amenities_subtitle' },
    update: {},
    create: {
      key: 'amenities_subtitle',
      value: 'Everything you need for a comfortable and memorable stay',
      type: 'text',
      section: 'amenities',
    },
  })

  // Seed experience content
  await prisma.content.upsert({
    where: { key: 'experience_title' },
    update: {},
    create: {
      key: 'experience_title',
      value: 'The Experience',
      type: 'text',
      section: 'experience',
    },
  })

  await prisma.content.upsert({
    where: { key: 'experience_subtitle' },
    update: {},
    create: {
      key: 'experience_subtitle',
      value: 'Discover the wonders of Iceland from your cozy yurt base',
      type: 'text',
      section: 'experience',
    },
  })

  // Seed gallery content
  await prisma.content.upsert({
    where: { key: 'gallery_title' },
    update: {},
    create: {
      key: 'gallery_title',
      value: 'Gallery',
      type: 'text',
      section: 'gallery',
    },
  })

  await prisma.content.upsert({
    where: { key: 'gallery_subtitle' },
    update: {},
    create: {
      key: 'gallery_subtitle',
      value: 'A glimpse into life at Náttúra YÚRTEL',
      type: 'text',
      section: 'gallery',
    },
  })

  // Seed location content
  await prisma.content.upsert({
    where: { key: 'location_title' },
    update: {},
    create: {
      key: 'location_title',
      value: 'Location',
      type: 'text',
      section: 'location',
    },
  })

  await prisma.content.upsert({
    where: { key: 'location_text' },
    update: {},
    create: {
      key: 'location_text',
      value: 'Located in the heart of Iceland\'s Golden Circle, Náttúra YÚRTEL offers easy access to some of the country\'s most spectacular natural attractions.',
      type: 'text',
      section: 'location',
    },
  })

  await prisma.content.upsert({
    where: { key: 'location_attractions' },
    update: {},
    create: {
      key: 'location_attractions',
      value: 'Geysir Hot Springs - 15 minutes\nGullfoss Waterfall - 20 minutes\nThingvellir National Park - 45 minutes\nReykjavik - 1.5 hours',
      type: 'text',
      section: 'location',
    },
  })

  // Seed stay content
  await prisma.content.upsert({
    where: { key: 'stay_title' },
    update: {},
    create: {
      key: 'stay_title',
      value: 'Your Stay',
      type: 'text',
      section: 'stay',
    },
  })

  await prisma.content.upsert({
    where: { key: 'stay_subtitle' },
    update: {},
    create: {
      key: 'stay_subtitle',
      value: 'Experience authentic Mongolian yurts in the heart of Iceland\'s wilderness',
      type: 'text',
      section: 'stay',
    },
  })

  // Seed booking content
  await prisma.content.upsert({
    where: { key: 'book_now_url' },
    update: {},
    create: {
      key: 'book_now_url',
      value: 'https://booking.example.com',
      type: 'url',
      section: 'booking',
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

