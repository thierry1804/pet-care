import { useEffect, useState } from 'react'

export default function Reports({ pets, currentPet }) {
  const [averageWeight, setAverageWeight] = useState(0)
  const [totalVaccinations, setTotalVaccinations] = useState(0)
  const [totalTreatments, setTotalTreatments] = useState(0)

  useEffect(() => {
    if (currentPet && currentPet.weights.length > 0) {
      const avg = currentPet.weights.reduce((sum, w) => sum + w.weight, 0) / currentPet.weights.length
      setAverageWeight(avg)
    }

    const vaccCount = pets.reduce((sum, pet) => sum + pet.vaccinations.length, 0)
    const treatCount = pets.reduce((sum, pet) => sum + pet.treatments.length, 0)
    setTotalVaccinations(vaccCount)
    setTotalTreatments(treatCount)
  }, [pets, currentPet])

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Rapports et statistiques</h3>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Évolution du poids de {currentPet?.name}</h4>
        {/* Ici, vous pouvez intégrer une bibliothèque de graphiques comme Chart.js pour afficher l'évolution du poids */}
        <p>Poids moyen : {averageWeight.toFixed(2)} kg</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">Statistiques globales</h4>
        <p>Nombre total de vaccinations : {totalVaccinations}</p>
        <p>Nombre total de traitements : {totalTreatments}</p>
      </div>
    </div>
  )
}

