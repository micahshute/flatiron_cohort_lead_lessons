import React from 'react'
import { PokeTeamLounge } from '../Styles'
import Pokemon from '../components/Pokemon'

export default function PokemonTeamContainer(props){

    const renderPokemon = () => {


        const handlePokemonRemoval = id => {
            props.removeTeamMember(id)
        }

        return props.team.map(p => (
            <Pokemon 
                id={p.id}
                key={p.id}
                name={p.name}
                type={p.type}
                buttonAction={'Remove'}
                buttonActionable={true}
                buttonFunction={handlePokemonRemoval}
                spriteURL={p.sprites.front_default}
            />
        ))
    }


    return (
        <PokeTeamLounge>
            <h2>Your Team</h2>
            {renderPokemon()}
        </PokeTeamLounge>
        
    )
}