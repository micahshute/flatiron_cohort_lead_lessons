document.addEventListener("DOMContentLoaded", function(){
    let memoizedPokemon = []
    const div = document.querySelector('#pokemon-container')
    const pokemonSearch = document.querySelector('#pokemon-search-form')
    const url = 'http://localhost:3000/pokemon'
    fetch(url)
        .then(res => res.json())
        .then(json => {
            memoizedPokemon = json
            const allPoke = renderAllPokemon(json)
            div.innerHTML = ''
            // div.innerHTML = memoizedPokemon
            
            for(el of allPoke){
                div.appendChild(el)
            }
        })
    
    pokemonSearch.addEventListener('input', e => handleSearch(e, memoizedPokemon, div))
    

})