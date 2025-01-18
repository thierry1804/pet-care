import { useState } from 'react'
import { Animal, Weight } from '../types/Animal'

interface WeightTrackerProps {
  pet: Animal
  onPetUpdated: () => void
}

export default function WeightTracker({ pet, onPetUpdated }: WeightTrackerProps) {
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newWeight: Weight = { date, weight: parseFloat(weight) }
    const updatedPet = { ...pet, weights: [...pet.weights, newWeight] }
    await fetch(`/api/pets/${pet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPet),
    })
    onPetUpdated()
    setWeight('')
    setDate(new Date().toISOString().split('T')[0])
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Suivi du poids</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Poids (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              step="0.1"
              min="0"
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
          Ajouter le poids
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Poids (kg)</th>
          </tr>
        </thead>
        <tbody>
          {pet.weights
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((weight, index) => (
              <tr key={index}>
                <td>{new Date(weight.date).toLocaleDateString()}</td>
                <td>{weight.weight}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

