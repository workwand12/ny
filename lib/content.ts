import { prisma } from './prisma'

export async function getContent(key: string): Promise<string> {
  const content = await prisma.content.findUnique({
    where: { key },
  })
  return content?.value || ''
}

export async function getAllContent(): Promise<Record<string, string>> {
  const contents = await prisma.content.findMany()
  return contents.reduce((acc, content) => {
    acc[content.key] = content.value
    return acc
  }, {} as Record<string, string>)
}

export async function updateContent(key: string, value: string) {
  return prisma.content.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
}

