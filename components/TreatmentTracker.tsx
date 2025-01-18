import { useState } from 'react'
import { Animal, Treatment } from '../types/Animal'

interface TreatmentTrackerProps {
  pet: Animal
  onPetUpdated: () => void
}

export default function TreatmentTracker({ pet, onPetUpdated }: TreatmentTrackerProps) {
  const [treatment, setTreatment] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newTreatment: Treatment = { date, treatment }
    const updatedPet = { ...pet, treatments: [...pet.treatments, newTreatment] }
    await fetch(`/api/pets/${pet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPet),
    })
    onPetUpdated()
    setTreatment('')
    setDate(new Date().toISOString().split('T')[0])
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Suivi des traitements</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
              Traitement
            </label>
            <input
              type="text"
              id="treatment"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
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
          Ajouter le traitement
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Traitement</th>
          </tr>
        </thead>
        <tbody>
          {pet.treatments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((treatment, index) => (
              <tr key={index}>
                <td>{new Date(treatment.date).toLocaleDateString()}</td>
                <td>{treatment.treatment}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

