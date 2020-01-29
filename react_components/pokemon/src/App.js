import React, {useState} from 'react';
import PokeTeamContainer from './containers/PokeTeamContainer'
import PokemonPoolContainer from './containers/PokemonPoolContainer'
import './App.css';

function App() {

  const [ pokemonTeam, setPokemonTeam ] = useState([])


  const choosePokemon = pokemonObj => {
    if(!teamIsFull()){
      const newTeam = [...pokemonTeam, pokemonObj]
      setPokemonTeam(newTeam)
    }
    
  }


  const handleRemoval = pokemonId => {
    const newTeam = pokemonTeam.filter(p => p.id !== pokemonId)
    setPokemonTeam(newTeam)
  }

  const teamIsFull = () => pokemonTeam.length >= 6

  return (
    <>
      <PokeTeamContainer team={pokemonTeam} removeTeamMember={handleRemoval}/>
      <PokemonPoolContainer 
        choosePokemon={choosePokemon}
        choosable={!teamIsFull()}
      />
    </>
  );
}

export default App;
