import React, {useState, useEffect} from 'react'
import Pokemon from '../components/Pokemon'
import APIMan from '../fetchHelper/APIManager'
import LoadableContent from '../hocs/LoadableContent'
import {
    PokeButton
} from '../Styles'


function PokemonPoolContainer(props){

    // const [isLoading, setIsLoading] = useState(false)
    const [pokemon, setPokemon] = useState([])
    const [nextLink, setNextLink] = useState('https://pokeapi.co/api/v2/pokemon')
    const [prevLink, setPrevLink] = useState('')
    const [getNextTrigger, setNextTrigger] = useState(true)
    const [getPrevTrigger, setPrevTrigger] = useState(false)

    useEffect(() => {

        //TODO: Use Promise.all instead of doing them one at a time
        const mapPokemonListToData = async (pokemon, man) => {
            // const pokemonData = []
            // for(let obj of pokemon){
            //     const res = await fetch(obj.url)
            //     if(!res.ok){ throw res }
            //     const pokemonObj = await res.json()
            //     pokemonData.push(pokemonObj)
                
            // }
            return await Promise.all(pokemon.map(p => {
                return man.pessimistic().get(p.url)
            }))
        }

        const getPokemonList = async (direction) => {
            const link = direction === 'next' ? nextLink : prevLink
            const apiMan = new APIMan()
            apiMan.handleError = err => {
                props.toggleLoading(false)
                alert(err.status)
            }
            await apiMan.pessimistic(() => {
                props.toggleLoading(true)
                return () => { props.toggleLoading(false) }
            }).get(link, async (data) => {
                const pokemon = await mapPokemonListToData(data.results, apiMan)
                data.next ? setNextLink(data.next) : setNextLink('')
                data.previous ? setPrevLink(data.previous) : setPrevLink('')
                setPokemon(pokemon)
            })
            
           
            // setIsLoading(true)
            // try{
            //     const link = direction === 'next' ? nextLink : prevLink
            //     const res = await fetch(link)
            //     if(!res.ok){ throw res }
            //     const data = await res.json()
            //     data.next ? setNextLink(data.next) : setNextLink('')
            //     data.previous ? setPrevLink(data.previous) : setPrevLink('')
            //     const pokemon = data.results
            //     const pokemonInfo = await mapPokemonListToData(pokemon)
            //     setIsLoading(false)
            //     setPokemon(pokemonInfo)

            // }catch(err){
            //     setIsLoading(false)
            //     alert(err.status)
            // }
            
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

    // const renderLoadingOrButtons = () => {
    //     if(props.isLoading){
    //         return (
    //             <div className={'loader'}></div>
    //         )
    //     }else{
    //         return(
    //             <>
    //             <PokeButton onClick={getPrevPokemon} disabled={prevLink === ''}>Prev</PokeButton>
    //             <PokeButton onClick={getNextPokemon} disabled={nextLink === ''}>Next</PokeButton>
    //             </>
    //         )
    //     }
    // }

    const getNextPokemon = async (e) => {
        setNextTrigger(true)
    }

    const getPrevPokemon = async (e) => {
        setPrevTrigger(true)
    }

    return (
        <>
            {renderPokemon()}
            <div>
                <PokeButton onClick={getPrevPokemon} disabled={prevLink === ''}>Prev</PokeButton>
                <PokeButton onClick={getNextPokemon} disabled={nextLink === ''}>Next</PokeButton>
            </div>
            
        </>
        
    )
}

export default LoadableContent(PokemonPoolContainer)