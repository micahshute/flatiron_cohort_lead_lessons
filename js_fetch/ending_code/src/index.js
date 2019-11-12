document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector('#pokemon-container')
    const search = document.querySelector('#pokemon-search-form')
    const form = document.querySelector('#pokemon-post-form')

    

    let memoizedPokemon = []

    fetch(url)
        .then(res => res.json())
        .then(json => {
            memoizedPokemon = json
            container.innerHTML = pokemonArrHTML(json)
        })


    search.addEventListener('input', e => handleSearch(e, memoizedPokemon, container))
    container.addEventListener('click', e => handleClick(e, memoizedPokemon))
    form.addEventListener('submit', e => handleSubmit(e, memoizedPokemon, container) )
})