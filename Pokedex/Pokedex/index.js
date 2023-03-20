const form = document.querySelector(".form");
const input = document.querySelector(".searchBar");

const fetchPokemons = async (pokemon) =>{
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
  }
  
}

const typeHandler = async (type) =>{
  const data = await fetchPokemons(type);

  if(data.types[1]){
    return data.types[0].type.name + " | " + data.types[1].type.name;
  }
  return data.types[0].type.name;
}

const readPokemons = async (filter) => {
   var pokemons = [];

    for(let i = 1; i < 152; i++){
      const data = await fetchPokemons(i);

        pokemons.push(
          {
            nome: data.name,
            id: data.id,
            habilidades: ["Grass", "Poison"],
            imagem: data["sprites"]["front_default"]
          },
      );
    }

    if (!filter)
      return pokemons;
    else{
      return pokemons.filter(async p => p.nome.indexOf(filter) > -1);
    }

}

const renderPokemons = async (pokemons) => {
  let html = "";
  
  if(!pokemons){
    for(pokemons = 1; pokemons < 152; pokemons++){
      const data = await fetchPokemons(pokemons);
  
      html  +=  `
      <li class="pokemonCard">
        <div class="image">
          <img height="200px" src="${data["sprites"]["front_default"]}"/>
        </div>
        <div class="info">
          <p>${data.id}</p>
          <h5>${data.name}</h5>
        </div>
        <div class="habilidades">
          <span class="${await typeHandler(pokemons)}">${await typeHandler(pokemons)}</span>
        </div>
      </li>`
      
    
    const listContainer = document.querySelector('.pokemonList');
    listContainer.innerHTML = html;
    }
  }  
  else{
    const data = await fetchPokemons(pokemons);

    html  +=  `
      <li class="pokemonCard">
        <div class="image">
          <img height="200px" src="${data["sprites"]["front_default"]}"/>
        </div>
        <div class="info">
          <p>${data.id}</p>
          <h5>${data.name}</h5>
        </div>
        <div class="habilidades">
        <span class="${await typeHandler(pokemons)}">${await typeHandler(pokemons)}</span>
        </div>
      </li>`
      
    
  
    const listContainer = document.querySelector('.pokemonList');
    listContainer.innerHTML = html;
  }
}

readPokemons();
renderPokemons(); 
  
input.addEventListener("input", () => {  
    renderPokemons(input.value.toLowerCase());  
})


