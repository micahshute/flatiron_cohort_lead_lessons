import React, {useState, useEffect} from 'react'
import Pokemon from '../components/Pokemon'
import {
    PokeButton
} from '../Styles'


export default function PokemonPoolContainer(props){

    const [isLoading, setIsLoading] = useState(false)
    const [pokemon, setPokemon] = useState([])
    const [nextLink, setNextLink] = useState('https://pokeapi.co/api/v2/pokemon')
    const [prevLink, setPrevLink] = useState('')
    const [getNextTrigger, setNextTrigger] = useState(true)
    const [getPrevTrigger, setPrevTrigger] = useState(false)

    useEffect(() => {

        //TODO: Use Promise.all instead of doing them one at a time
        const mapPokemonListToData = async (pokemon) => {
            const pokemonData = []
            for(let obj of pokemon){
                const res = await fetch(obj.url)
                if(!res.ok){ throw res }
                const pokemonObj = await res.json()
                pokemonData.push(pokemonObj)
                
            }
            return pokemonData
        }

        const getPokemonList = async (direction) => {
            setIsLoading(true)
            try{
                const link = direction === 'next' ? nextLink : prevLink
                const res = await fetch(link)
                if(!res.ok){ throw res }
                const data = await res.json()
                const nlink = data.next
                if(nlink){
                    setNextLink(nlink)
                }else{
                    setNextLink('')
                }
                const plink = data.previous
                if(plink){ 
                    setPrevLink(plink)
                }else{
                    setPrevLink('')
                }
                const pokemon = data.results
                const pokemonInfo = await mapPokemonListToData(pokemon)
                setIsLoading(false)
                setPokemon(pokemonInfo)

            }catch(err){
                setIsLoading(false)
                alert(err.status)
            }
            
        }

        

        if(getNextTrigger){ 
            getPokemonList('next') 
            setNextTrigger(false)
        }else if(getPrevTrigger){
            getPokemonList('prev')
            setPrevTrigger(false)
        }


    }, [getNextTrigger, getPrevTrigger])

    

    

    const choosePokemon = id => {
        const chosenPokemon = pokemon.find(p => p.id == id)
        props.choosePokemon(chosenPokemon)
    }

    const renderPokemon = () => {
        console.log(pokemon)
        return pokemon.map(p => (
            <Pokemon 
                name={p.name}
                type={p.type}
                id={p.id}
                key={p.id}
                spriteURL={p.sprites.front_default}
                buttonFunction={choosePokemon}
                buttonActionable={props.choosable}
                buttonAction={"Choose"}
            />
        ))
    }

    const renderLoading = () => {
        if(isLoading){
            return (
                <div className={'loader'}></div>
            )
        }
    }

    const getNextPokemon = async (e) => {
        setNextTrigger(true)
    }

    const getPrevPokemon = async (e) => {
        setPrevTrigger(true)
    }

    return (
        <>
            {renderPokemon()}
            {renderLoading()}
            <PokeButton onClick={getNextPokemon} disabled={nextLink === ''}>Next</PokeButton>
            <PokeButton onClick={getPrevPokemon} disabled={prevLink === ''}>Prev</PokeButton>
        </>
        
    )
}