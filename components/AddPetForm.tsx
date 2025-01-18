import { useState } from 'react'
import { Animal } from '../types/Animal'

interface AddPetFormProps {
  onPetAdded: (pet: Animal) => void
}

export default function AddPetForm({ onPetAdded }: AddPetFormProps) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [birthdate, setBirthdate] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newPet = { name, species, birthdate, weights: [], vaccinations: [], treatments: [] }
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    })
    const addedPet = await response.json()
    onPetAdded(addedPet)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Ajouter un nouvel animal</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="species" className="block text-sm font-medium text-gray-700">
          Espèce
        </label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
          Date de naissance
        </label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ajouter l'animal
      </button>
    </form>
  )
}

