<script>
  export let pet;

  let newTreatment = '';
  let newDate = new Date().toISOString().split('T')[0];

  function addTreatment() {
    if (newTreatment && newDate) {
      pet.treatments = [...pet.treatments, { date: newDate, treatment: newTreatment }];
      newTreatment = '';
      newDate = new Date().toISOString().split('T')[0];
    }
  }
</script>

<div class="treatment-tracker">
  <h3>Suivi des traitements</h3>
  <div class="treatment-form">
    <input type="text" bind:value={newTreatment} placeholder="Nom du traitement" />
    <input type="date" bind:value={newDate} />
    <button on:click={addTreatment}>Ajouter</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Traitement</th>
      </tr>
    </thead>
    <tbody>
      {#each pet.treatments.sort((a, b) => new Date(b.date) - new Date(a.date)) as treatment}
        <tr>
          <td>{new Date(treatment.date).toLocaleDateString()}</td>
          <td>{treatment.treatment}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .treatment-tracker {
    margin-bottom: 20px;
  }

  .treatment-form {
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

