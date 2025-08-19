const content = document.getElementById('detail');

let characterId = Number(window.location.hash.slice(1)) || 1;

const fetchCharacter = async (id) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) throw new Error('Character not found');
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const renderCharacter = (character) => {
  if (!character) {
    content.innerHTML = '<p>Detalhes não encontrados.</p>';
    return;
  }

  content.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" />
    <p>Espécie: ${character.species}</p>
    <p>Gênero: ${character.gender}</p>
    <p>Dimensão: ${character.origin.name}</p>
    <p>Status: ${character.status}</p>
    <button id="prevBtn">Anterior</button>
    <button id="nextBtn">Próximo</button>
  `;

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (characterId > 1) updateCharacterId(characterId - 1);
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    updateCharacterId(characterId + 1);
  });
};

const updateCharacterId = (newId) => {
  if(newId < 1) return; // evita ids negativos ou zero
  // Opcional: pode colocar um limite máximo aqui (exemplo: 826 personagens)
  const maxId = 826;
  if(newId > maxId) return;
  
  characterId = newId;
  window.location.hash = `#${characterId}`;
};

const loadCharacter = async () => {
  const character = await fetchCharacter(characterId);
  renderCharacter(character);
};

// Atualiza conteúdo quando o hash da URL mudar
window.addEventListener('hashchange', () => {
  characterId = Number(window.location.hash.slice(1)) || 1;
  loadCharacter();
});

// Escuta setas do teclado para navegar entre personagens
window.addEventListener('keydown', (event) => {
  if(event.key === 'ArrowRight') {
    updateCharacterId(characterId + 1);
  } else if(event.key === 'ArrowLeft') {
    if(characterId > 1) {
      updateCharacterId(characterId - 1);
    }
  }
});

// Primeira carga
loadCharacter();
