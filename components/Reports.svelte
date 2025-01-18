<script>
  export let pets;
  export let currentPet;

  $: weightData = currentPet.weights.map(w => ({ x: new Date(w.date), y: w.weight }));

  $: averageWeight = currentPet.weights.reduce((sum, w) => sum + w.weight, 0) / currentPet.weights.length;

  $: totalVaccinations = pets.reduce((sum, pet) => sum + pet.vaccinations.length, 0);
  $: totalTreatments = pets.reduce((sum, pet) => sum + pet.treatments.length, 0);
</script>

<div class="reports">
  <h3>Rapports et statistiques</h3>
  <div class="weight-chart">
    <h4>Évolution du poids de {currentPet.name}</h4>
    <!-- Ici, vous pouvez intégrer une bibliothèque de graphiques comme Chart.js pour afficher l'évolution du poids -->
    <p>Poids moyen : {averageWeight.toFixed(2)} kg</p>
  </div>
  <div class="global-stats">
    <h4>Statistiques globales</h4>
    <p>Nombre total de vaccinations : {totalVaccinations}</p>
    <p>Nombre total de traitements : {totalTreatments}</p>
  </div>
</div>

<style>
  .reports {
    margin-bottom: 20px;
  }

  .weight-chart, .global-stats {
    margin-bottom: 10px;
  }
</style>

