<script>
  export let pet;

  let newVaccine = '';
  let newDate = new Date().toISOString().split('T')[0];

  function addVaccination() {
    if (newVaccine && newDate) {
      pet.vaccinations = [...pet.vaccinations, { date: newDate, vaccine: newVaccine }];
      newVaccine = '';
      newDate = new Date().toISOString().split('T')[0];
    }
  }
</script>

<div class="vaccination-manager">
  <h3>Gestion des vaccinations</h3>
  <div class="vaccination-form">
    <input type="text" bind:value={newVaccine} placeholder="Nom du vaccin" />
    <input type="date" bind:value={newDate} />
    <button on:click={addVaccination}>Ajouter</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Vaccin</th>
      </tr>
    </thead>
    <tbody>
      {#each pet.vaccinations.sort((a, b) => new Date(b.date) - new Date(a.date)) as vaccination}
        <tr>
          <td>{new Date(vaccination.date).toLocaleDateString()}</td>
          <td>{vaccination.vaccine}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .vaccination-manager {
    margin-bottom: 20px;
  }

  .vaccination-form {
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

