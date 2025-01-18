import { useState } from 'react'
import { Animal, Vaccination } from '../types/Animal'

interface VaccinationManagerProps {
  pet: Animal
  onPetUpdated: () => void
}

export default function VaccinationManager({ pet, onPetUpdated }: VaccinationManagerProps) {
  const [vaccine, setVaccine] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newVaccination: Vaccination = { date, vaccine }
    const updatedPet = { ...pet, vaccinations: [...pet.vaccinations, newVaccination] }
    await fetch(`/api/pets/${pet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPet),
    })
    onPetUpdated()
    setVaccine('')
    setDate(new Date().toISOString().split('T')[0])
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gestion des vaccinations</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="vaccine" className="block text-sm font-medium text-gray-700">
              Vaccin
            </label>
            <input
              type="text"
              id="vaccine"
              value={vaccine}
              onChange={(e) => setVaccine(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter la vaccination
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Vaccin</th>
          </tr>
        </thead>
        <tbody>
          {pet.vaccinations
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((vaccination, index) => (
              <tr key={index}>
                <td>{new Date(vaccination.date).toLocaleDateString()}</td>
                <td>{vaccination.vaccine}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

