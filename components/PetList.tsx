import { Animal } from '../types/Animal'

interface PetListProps {
  pets: Animal[]
  onSelectPet: (pet: Animal) => void
  onAddPet: () => void
  selectedPetId: string | null
}

export default function PetList({ pets, onSelectPet, onAddPet, selectedPetId }: PetListProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Mes Animaux</h2>
      <ul className="space-y-2">
        {pets.map((pet) => (
          <li key={pet.id}>
            <button
              onClick={() => onSelectPet(pet)}
              className={`w-full text-left px-4 py-2 rounded ${
                pet.id === selectedPetId ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {pet.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onAddPet}
        className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Ajouter un animal
      </button>
    </div>
  )
}

