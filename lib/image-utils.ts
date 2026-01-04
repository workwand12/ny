// Image sizing guidelines for each section
export const IMAGE_GUIDELINES: Record<string, {
  recommended: string
  minWidth: number
  minHeight: number
  aspectRatio: string
  description: string
}> = {
  hero: {
    recommended: '1920x1080px (16:9)',
    minWidth: 1920,
    minHeight: 1080,
    aspectRatio: '16/9',
    description: 'Full-width hero image. Should be high quality and optimized. Recommended format: JPG or WebP. Max file size: 500KB for best performance.',
  },
  story: {
    recommended: '1200x900px (4:3)',
    minWidth: 1200,
    minHeight: 900,
    aspectRatio: '4/3',
    description: 'Editorial-style image that appears alongside story text. Works well on desktop and mobile.',
  },
  experience: {
    recommended: '1200x900px (4:3)',
    minWidth: 800,
    minHeight: 600,
    aspectRatio: '4/3',
    description: 'Experience card images. Displayed in grid format, responsive on all devices.',
  },
  gallery: {
    recommended: '1200x1200px (1:1) or 1200x800px (3:2)',
    minWidth: 800,
    minHeight: 800,
    aspectRatio: '1/1 or 3/2',
    description: 'Gallery images. Square format works best for grid layouts. Can be mixed aspect ratios.',
  },
  amenity: {
    recommended: '800x600px (4:3)',
    minWidth: 600,
    minHeight: 450,
    aspectRatio: '4/3',
    description: 'Small amenity images (optional). Currently using icons, but images can be added.',
  },
}

