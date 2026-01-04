import { Hero } from '@/components/sections/Hero'
import { Story } from '@/components/sections/Story'
import { Amenities } from '@/components/sections/Amenities'
import { Experience } from '@/components/sections/Experience'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { LocationPreview } from '@/components/sections/LocationPreview'
import { getContent } from '@/lib/content'

export default async function Home() {
  const heroTitle = await getContent('hero_title')
  const heroSubtitle = await getContent('hero_subtitle')
  const heroImage = await getContent('hero_image')
  const storyTitle = await getContent('story_title')
  const storyText = await getContent('story_text')
  const storyImage = await getContent('story_image')

  return (
    <>
      <Hero title={heroTitle} subtitle={heroSubtitle} image={heroImage} />
      <Story title={storyTitle} text={storyText} image={storyImage} />
      <Amenities />
      <Experience />
      <GalleryPreview />
      <LocationPreview />
    </>
  )
}


