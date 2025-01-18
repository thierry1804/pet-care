<script>
  export let pets;

  $: notifications = pets.flatMap(pet => [
    ...pet.vaccinations
      .filter(v => isUpcoming(v.date))
      .map(v => ({ pet: pet.name, type: 'vaccination', name: v.vaccine, date: v.date })),
    ...pet.treatments
      .filter(t => isUpcoming(t.date))
      .map(t => ({ pet: pet.name, type: 'traitement', name: t.treatment, date: t.date }))
  ]);

  function isUpcoming(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    return date > now && date <= twoWeeksFromNow;
  }
</script>

<div class="notifications">
  <h3>Notifications</h3>
  {#if notifications.length > 0}
    <ul>
      {#each notifications as notification}
        <li>
          {notification.pet} a un {notification.type} ({notification.name}) prévu le {new Date(notification.date).toLocaleDateString()}
        </li>
      {/each}
    </ul>
  {:else}
    <p>Aucune notification pour le moment.</p>
  {/if}
</div>

<style>
  .notifications {
    margin-bottom: 20px;
  }

  ul {
    padding-left: 20px;
  }
</style>

