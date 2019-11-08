

function renderPokemonCard(pokemon){
    const cardDiv = document.createElement('div')
    cardDiv.className = 'pokemon-card'
    const frameDiv = document.createElement('div')
    frameDiv.className = 'pokemon-frame'
    const h1 = document.createElement('h1')
    h1.className = 'center-text'
    h1.innerText = pokemon.name
    const imageDiv = document.createElement('div')
    imageDiv.className = 'pokemon-image'
    const img = document.createElement('img')
    img.className = 'toggle-sprite'
    img.src = pokemon.sprites.front
    img.setAttribute('data-id', pokemon.id)
    img.setAttribute('data-action', 'flip')
    const btn = document.createElement('button')
    btn.className = 'pokemon-button'
    btn.setAttribute('data-action', 'delete')
    btn.innerText = "Delete"

    cardDiv.appendChild(frameDiv)
    frameDiv.appendChild(h1)
    frameDiv.appendChild(imageDiv)
    imageDiv.appendChild(img)
    frameDiv.appendChild(btn)
    return cardDiv

}

function renderAllPokemon(parr){
    return parr.map(p => renderPokemonCard(p))
}


function handleSearch(e, allPokemon, container){
    console.log(allPokemon)
    const filteredPokemon = allPokemon.filter(pObj => {
        return pObj.name.includes(e.target.value.toLowerCase())
    })
    const filteredObjs = renderAllPokemon(filteredPokemon)
    container.innerHTML = ''
    if(filteredObjs.length == 0){
        container.innerHTML = "<p><center>There are no Pokemon here</center></p>"
    }else{
        for(let el of filteredObjs){
            container.appendChild(el)
        }
    }
}

// function renderPokemonCard(pokemon) {
//     return (`
//     <div class="pokemon-card">
//       <div class="pokemon-frame">
//         <h1 class="center-text">${pokemon.name}</h1>
//         <div class="pokemon-image">
//           <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
//         </div>
//         <button data-action="delete" class="pokemon-button">Delete</button>
//       </div>
//     </div>`)
//   }
  
