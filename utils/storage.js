export function loadPets() {
  const petsData = localStorage.getItem('pets');
  return petsData ? JSON.parse(petsData) : [];
}

export function savePets(pets) {
  localStorage.setItem('pets', JSON.stringify(pets));
}

