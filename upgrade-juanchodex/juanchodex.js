let ALL_POKEMONS = [];

const typeColors = {
  fire: "#FF4500",
  grass: "#006400",
  water: "#00FFFF",
  flying: "#F4A460",
  electric: "#FFD700",
  ground: "#8B4513",
  rock: "#C0C0C0",
  fairy: "#FFB6C1",
  bug: "#98FB98",
  poison: "#BA55D3",
  dragon: "#5a8bee",
  psychic: "#FF69B4",
  fighting: "#A52A2A",
  normal: "#FFDAB9",
  ghost: "#800080",
  steel: "#708090",
  ice: "#ADD8E6",
  dark: "#25259e",
  all: "wheat",
};

const typeNames = {
  fire: "fuego",
  grass: "planta",
  water: "agua",
  flying: "volador",
  electric: "eléctrico",
  ground: "tierra",
  rock: "roca",
  fairy: "hada",
  bug: "bicho",
  poison: "veneno",
  dragon: "dragón",
  psychic: "psíquico",
  fighting: "lucha",
  normal: "normal",
  ghost: "fantasma",
  steel: "acero",
  ice: "hielo",
  dark: "siniestro",
};

const paintPokemons = (pokemonsToPaint) => {
  const pokedex$$ = document.querySelector("#pokedex");
  pokedex$$.innerHTML = "";

  const renderTypes = (pokemon) => {
    if (pokemon.types[1]) {
      return `
      <div class="pkmn__info--type__name">${pokemon.types[0].type.name}</div>
      <div class="pkmn__info--type__name">${pokemon.types[1].type.name}</div>
      `;
    } else {
      return `
      <div class="pkmn__info--type__name">${pokemon.types[0].type.name}</div>
      `;
    }
  };

  pokemonsToPaint.forEach((pokemon) => {
    const pokemonCard$$ = document.createElement("div");
    pokemonCard$$.className = "flip-card";

    const pokemonData = `
    
  <div class="flip-card-inner">
    <div class="flip-card-front" >
    <img class="pkmn__image" src=${pokemon.sprites.front_default} alt=${
      pokemon.name
    }>
    <h2 class="pkmn__id">#${pokemon.id.toString().padStart(3, "0")}</h2>
    <h2 class="pkmn__name">${pokemon.name}</h2>
    <div class="pkmn__info">
    <div class="pkmn__info--type">${renderTypes(pokemon)}
    </div>
    
    </div>
    </div>
    <div class="flip-card-back" style="background:${getBGColorStyleByPokemon(
      pokemon
    )};">
    <img class="pkmn__image" src=${pokemon.sprites.back_default} alt=${
      pokemon.name
    }>
    
    <div class="pkmn__info">
    <h2 class="pkmn__info--title">Estadísticas base</h2>
    <div class="pkmn__info--statcontainer">
    <h3 class="pkmn__info--stat">ATQ: ${pokemon.stats[1].base_stat}</h3>
    <h3 class="pkmn__info--stat">ATS: ${pokemon.stats[3].base_stat}</h3>
    <h3 class="pkmn__info--stat">DEF: ${pokemon.stats[2].base_stat}</h3>
    <h3 class="pkmn__info--stat">DFS: ${pokemon.stats[4].base_stat}</h3>
    <h3 class="pkmn__info--stat">HP: ${pokemon.stats[0].base_stat}</h3>
    <h3 class="pkmn__info--stat">VEL: ${pokemon.stats[5].base_stat}</h3>
    </div>
    </div>
    </div>
  </div>
`;
    pokemonCard$$.innerHTML = pokemonData;

    pokedex$$.appendChild(pokemonCard$$);
  });

  paintTypeBox();
};

const paintTypeBox = () => {
  const allTypeBox$$ = document.getElementsByClassName(
    "pkmn__info--type__name"
  );
  for (let index = 0; index < allTypeBox$$.length; index++) {
    const typeBox$$ = allTypeBox$$[index];

    typeBox$$.style.backgroundColor = typeColors[typeBox$$.innerHTML];
    typeBox$$.innerHTML = typeNames[typeBox$$.innerHTML];
  }
};

const getBGColorStyleByPokemon = (pokemon) => {
  if (pokemon.types.length === 1) {
    return typeColors[pokemon.types[0].type.name];
  } else {
    return `linear-gradient(
      135deg,
      ${typeColors[pokemon.types[0].type.name]} 33%,
      ${typeColors[pokemon.types[1].type.name]} 66%,
      ${typeColors[pokemon.types[1].type.name]} 100%
    )`;
  }
};

const catchOnePokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonApi = await fetch(url);
  const pokemon = await pokemonApi.json();

  ALL_POKEMONS.push(pokemon);
};

const catchAllPokemons = async () => {
  for (let id = 1; id <= 151; id++) {
    await catchOnePokemon(id);
  }
  paintPokemons(ALL_POKEMONS);
};

const filterPokemon = (event) => {
  const searchInput = event.target.value.toLowerCase().trim();

  const filtered = ALL_POKEMONS.filter((pokemon) => {
    const pokemonId = pokemon.id === Number(searchInput);
    const pokemonName = pokemon.name.toLowerCase().includes(searchInput);

    return pokemonId || pokemonName;
  });
  paintPokemons(filtered);
};

const filterPokemonByType = (type) => {
  if (type === "all") {
    document.body.style.backgroundColor = typeColors[type];
    return paintPokemons(ALL_POKEMONS);
  }

  const filteredByType = ALL_POKEMONS.filter((pokemon) => {
    let = firstType = false;
    let = secondType = false;

    if (pokemon.types[1]) {
      secondType = pokemon.types[1].type.name === type;
    }
    if (pokemon.types[0]) {
      firstType = pokemon.types[0].type.name === type;
    }

    return firstType || secondType;
  });
  paintPokemons(filteredByType);
  document.body.style.backgroundColor = typeColors[type];
};

document.getElementById("search__input").addEventListener("input", (event) => {
  filterPokemon(event);
});

document.querySelectorAll(".types__selector").forEach((button) => {
  button.addEventListener("click", (event) => {
    filterPokemonByType(event.target.classList[1]);
    console.log(event.target.classList[1]);
  });
});

catchAllPokemons();
