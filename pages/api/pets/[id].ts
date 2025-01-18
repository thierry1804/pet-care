import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { Animal } from '../../../types/Animal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    const pets = await kv.get<Animal[]>('pets') || []
    const pet = pets.find(p => p.id === id)
    if (pet) {
      res.status(200).json(pet)
    } else {
      res.status(404).json({ message: 'Animal non trouvé' })
    }
  } else if (req.method === 'PUT') {
    const updatedPet: Animal = req.body
    const pets = await kv.get<Animal[]>('pets') || []
    const updatedPets = pets.map(p => p.id === id ? updatedPet : p)
    await kv.set('pets', updatedPets)
    res.status(200).json(updatedPet)
  } else if (req.method === 'DELETE') {
    const pets = await kv.get<Animal[]>('pets') || []
    const updatedPets = pets.filter(p => p.id !== id)
    await kv.set('pets', updatedPets)
    res.status(204).end()
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

