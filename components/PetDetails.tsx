import { useState } from 'react'
import { Animal } from '../types/Animal'
import WeightTracker from './WeightTracker'
import VaccinationManager from './VaccinationManager'
import TreatmentTracker from './TreatmentTracker'

interface PetDetailsProps {
  pet: Animal
  onPetUpdated: () => void
}

export default function PetDetails({ pet, onPetUpdated }: PetDetailsProps) {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{pet.name}</h2>
      <div className="mb-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 rounded-md ${
              activeTab === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab('weight')}
            className={`px-3 py-2 rounded-md ${
              activeTab === 'weight' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Poids
          </button>
          <button
            onClick={() => setActiveTab('vaccinations')}
            className={`px-3 py-2 rounded-md ${
              activeTab === 'vaccinations' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Vaccinations
          </button>
          <button
            onClick={() => setActiveTab('treatments')}
            className={`px-3 py-2 rounded-md ${
              activeTab === 'treatments' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Traitements
          </button>
        </nav>
      </div>
      {activeTab === 'profile' && (
        <div>
          <p><strong>Espèce:</strong> {pet.species}</p>
          <p><strong>Date de naissance:</strong> {new Date(pet.birthdate).toLocaleDateString()}</p>
        </div>
      )}
      {activeTab === 'weight' && <WeightTracker pet={pet} onPetUpdated={onPetUpdated} />}
      {activeTab === 'vaccinations' && <VaccinationManager pet={pet} onPetUpdated={onPetUpdated} />}
      {activeTab === 'treatments' && <TreatmentTracker pet={pet} onPetUpdated={onPetUpdated} />}
    </div>
  )
}

