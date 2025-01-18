import { useState, useEffect } from 'react'
import Head from 'next/head'
import PetList from '../components/PetList'
import PetDetails from '../components/PetDetails'
import AddPetForm from '../components/AddPetForm'

export default function Home() {
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [isAddingPet, setIsAddingPet] = useState(false)

  useEffect(() => {
    fetchPets()
  }, [])

  async function fetchPets() {
    const response = await fetch('/api/pets')
    const data = await response.json()
    setPets(data)
  }

  function handlePetSelect(pet) {
    setSelectedPet(pet)
    setIsAddingPet(false)
  }

  function handleAddPet() {
    setSelectedPet(null)
    setIsAddingPet(true)
  }

  async function handlePetAdded(newPet) {
    await fetchPets()
    setIsAddingPet(false)
    setSelectedPet(newPet)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Gestion des Animaux Domestiques</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Gestion des Animaux Domestiques</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <PetList 
              pets={pets} 
              onSelectPet={handlePetSelect} 
              onAddPet={handleAddPet}
              selectedPetId={selectedPet?.id}
            />
          </div>
          <div className="w-full md:w-2/3">
            {isAddingPet ? (
              <AddPetForm onPetAdded={handlePetAdded} />
            ) : selectedPet ? (
              <PetDetails pet={selectedPet} onPetUpdated={fetchPets} />
            ) : (
              <p className="text-center text-gray-500">Sélectionnez un animal ou ajoutez-en un nouveau pour commencer.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

