import { useState } from 'react'
import Image from 'next/image'

export default function PetProfile({ pet, updatePet }) {
  const [name, setName] = useState(pet.name)
  const [species, setSpecies] = useState(pet.species)
  const [birthdate, setBirthdate] = useState(pet.birthdate)

  async function handleSubmit(e) {
    e.preventDefault()
    const updatedPet = { ...pet, name, species, birthdate }
    await fetch(`/api/pets/${pet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPet)
    })
    updatePet()
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    await fetch(`/api/pets/${pet.id}/image`, {
      method: 'POST',
      body: formData
    })
    updatePet()
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Profil de {pet.name}</h2>
      <div className="flex items-start">
        <div className="mr-4">
          {pet.image ? (
            <Image src={pet.image || "/placeholder.svg"} alt={pet.name} width={200} height={200} className="object-cover rounded" />
          ) : (
            <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center rounded">
              Aucune image
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="mb-2">
            <label className="block">
              Nom:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" />
            </label>
          </div>
          <div className="mb-2">
            <label className="block">
              Espèce:
              <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} className="w-full p-2 border rounded" />
            </label>
          </div>
          <div className="mb-2">
            <label className="block">
              Date de naissance:
              <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full p-2 border rounded" />
            </label>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Mettre à jour</button>
        </form>
      </div>
    </div>
  )
}

