import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import { Animal } from '../../../types/Animal'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const pets = await kv.get<Animal[]>('pets') || []
    res.status(200).json(pets)
  } else if (req.method === 'POST') {
    const newPet: Animal = { id: Date.now().toString(), ...req.body }
    const pets = await kv.get<Animal[]>('pets') || []
    await kv.set('pets', [...pets, newPet])
    res.status(201).json(newPet)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

