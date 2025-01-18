<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import PetProfile from './components/PetProfile.svelte';
  import WeightTracker from './components/WeightTracker.svelte';
  import VaccinationManager from './components/VaccinationManager.svelte';
  import TreatmentTracker from './components/TreatmentTracker.svelte';
  import Notifications from './components/Notifications.svelte';
  import Reports from './components/Reports.svelte';
  import { loadPets, savePets } from './utils/storage';

  let pets = writable([]);
  let currentPet = writable(null);

  onMount(() => {
    pets.set(loadPets());
    if ($pets.length > 0) {
      currentPet.set($pets[0]);
    }
  });

  $: {
    if ($pets) {
      savePets($pets);
    }
  }

  function addPet() {
    const newPet = { id: Date.now(), name: 'Nouveau compagnon', species: '', birthdate: '', weights: [], vaccinations: [], treatments: [] };
    pets.update(p => [...p, newPet]);
    currentPet.set(newPet);
  }
</script>

<main>
  <h1>Gestion des animaux domestiques</h1>
  
  <div class="pet-selector">
    <select bind:value={$currentPet}>
      {#each $pets as pet}
        <option value={pet}>{pet.name}</option>
      {/each}
    </select>
    <button on:click={addPet}>Ajouter un animal</button>
  </div>

  {#if $currentPet}
    <PetProfile bind:pet={$currentPet} />
    <WeightTracker bind:pet={$currentPet} />
    <VaccinationManager bind:pet={$currentPet} />
    <TreatmentTracker bind:pet={$currentPet} />
    <Reports {pets} currentPet={$currentPet} />
  {/if}

  <Notifications {pets} />
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .pet-selector {
    margin-bottom: 20px;
  }

  select, button {
    margin-right: 10px;
  }
</style>

