import React, { useState } from 'react';

// ...existing code...

interface Pet {
  name?: string;
  species?: string;
  birthdate?: string;
}

interface PetProfileProps {
  pet?: Pet; // Make pet optional
  updatePet: (pet: Pet) => void;
}

export default function PetProfile({ pet = {}, updatePet }: PetProfileProps) {
  const isPetObject = typeof pet === 'object' && pet !== null;
  const [name, setName] = useState(isPetObject && pet.name ? pet.name : '');
  const [species, setSpecies] = useState(isPetObject && pet.species ? pet.species : '');
  const [birthdate, setBirthdate] = useState(isPetObject && pet.birthdate ? pet.birthdate : '');

  // ...existing code...
}
