import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'

export default async function GalleryPage() {
  const dataDirectory = path.join(process.cwd(), 'data')
  const filenames = await fs.readdir(dataDirectory)

  const ships = await Promise.all(
    filenames.map(async (file) => {
      const filePath = path.join(dataDirectory, file)
      const content = await fs.readFile(filePath, 'utf8')
      return JSON.parse(content)
    })
  )

  return (
    <main className="p-10">
      <h1 className='text-5xl font-bold mb-10'>Starship Gallery</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-6'>
        {ships.map((ship) => (
          <Link
            key={ship.id}
            href={`/ships/${ship.id}`}
            className='group border rounded-xl overflow-hidden hover:shadow-2xl transition-all'
          >
            <div className='aspect-video relative overflow-hidden bg-gray-200'>
              <img
                src={ship.image}
                alt={ship.id}
                className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300'
              />
            </div>
            <div className='p-4 bg-white'>
              <h2 className='text-2xl text-gray-700 font-bold capitalize'>{ship.id.replace(/-/g, ' ')}</h2>
              <p className='text-gray-500'>{ship.faction}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
