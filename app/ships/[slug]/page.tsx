import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

export default async function Ship({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const filePath = path.join(process.cwd(), 'data', `${slug}.json`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const ship = JSON.parse(fileContent)

    return (
      <main className='p-10'>
        <h1 className='text-4xl font-bold capitalize'>{ship.id}</h1>
        <p className='text-gray-500 text-xl'>{ship.faction}</p>
        <img src={ship.image} alt={ship.id} className='mt-6 w-full max-w-md rounded-xl shadow-lg'/>
      </main>
    )
  } catch (error) {
    notFound()
  }
}

export async function generateStaticParams() {
  const dataDirectory = path.join(process.cwd(), 'data')
  const filenames = await fs.readdir(dataDirectory)

  return filenames.map((filename) => ({
    slug: filename.replace('.json', '')
  }))
}

