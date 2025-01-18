<script>
  export let pet;

  let newWeight = '';
  let newDate = new Date().toISOString().split('T')[0];

  function addWeight() {
    if (newWeight && newDate) {
      pet.weights = [...pet.weights, { date: newDate, weight: parseFloat(newWeight) }];
      newWeight = '';
      newDate = new Date().toISOString().split('T')[0];
    }
  }
</script>

<div class="weight-tracker">
  <h3>Suivi du poids</h3>
  <div class="weight-form">
    <input type="number" bind:value={newWeight} placeholder="Poids (kg)" step="0.1" min="0" />
    <input type="date" bind:value={newDate} />
    <button on:click={addWeight}>Ajouter</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Poids (kg)</th>
      </tr>
    </thead>
    <tbody>
      {#each pet.weights.sort((a, b) => new Date(b.date) - new Date(a.date)) as weight}
        <tr>
          <td>{new Date(weight.date).toLocaleDateString()}</td>
          <td>{weight.weight}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .weight-tracker {
    margin-bottom: 20px;
  }

  .weight-form {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 5px;
    text-align: left;
  }
</style>

