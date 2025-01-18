<script>
  export let pet;

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        pet.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
</script>

<div class="pet-profile">
  <h2>Profil de {pet.name}</h2>
  <div class="profile-image">
    {#if pet.image}
      <img src={pet.image || "/placeholder.svg"} alt={pet.name} />
    {:else}
      <div class="placeholder">Aucune image</div>
    {/if}
    <input type="file" accept="image/*" on:change={handleImageUpload} />
  </div>
  <div class="profile-details">
    <label>
      Nom:
      <input type="text" bind:value={pet.name} />
    </label>
    <label>
      Espèce:
      <input type="text" bind:value={pet.species} />
    </label>
    <label>
      Date de naissance:
      <input type="date" bind:value={pet.birthdate} />
    </label>
  </div>
</div>

<style>
  .pet-profile {
    margin-bottom: 20px;
  }

  .profile-image {
    margin-bottom: 10px;
  }

  .profile-image img, .placeholder {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border: 1px solid #ccc;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
  }

  .profile-details label {
    display: block;
    margin-bottom: 10px;
  }
</style>

