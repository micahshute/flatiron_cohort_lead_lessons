import React, { useState } from 'react'
import Form from './Form'
import Pokemon from './Pokemon'

export default function SearchPokemon(props){

    const [ pokemon, setPokemon ] = useState(null)


    const handelSubmit = async ([search]) => {
        setPokemon(null)
        try{
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
            if(!res.ok){ throw res }
            const data = await res.json()
            if(!data){ throw 'Not found'}
            setPokemon(data)
        }catch(err){
            setPokemon({name: 'Not Found', id: -1, sprites: { front_default: ''}})
        }
        
    }


    const renderPokemon = () => {
        if(pokemon){
            return <Pokemon 
                name={pokemon.name}
                id={pokemon.id}
                spriteURL={pokemon.sprites.front_default}
                buttonLabel={'Choose'}
                handlePokemonClick={pokemon.id === -1 ? () => {return null } : props.handleChoosePokemon }
            />
        }
    }

    return(
        <div>
            <Form 
                inputs={['Search Pokemon']}
                submitCallback={handelSubmit}
                submitValue={'Search'}
            />
            {renderPokemon()}
        </div>
    )
}