import type { NextApiRequest, NextApiResponse } from 'next'
import { kv } from '@vercel/kv'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing form data' })
        return
      }

      const { id } = req.query
      const file = files.image as formidable.File

      if (!file) {
        res.status(400).json({ error: 'No image file provided' })
        return
      }

      const data = fs.readFileSync(file.filepath)
      const base64Image = `data:${file.mimetype};base64,${data.toString('base64')}`

      const pets = await kv.get('pets') || []
      const updatedPets = pets.map(p => {
        if (p.id === id) {
          return { ...p, image: base64Image }
        }
        return p
      })

      await kv.set('pets', updatedPets)
      res.status(200).json({ message: 'Image uploaded successfully' })
    })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

