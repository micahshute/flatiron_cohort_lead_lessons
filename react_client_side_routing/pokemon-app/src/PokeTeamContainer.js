import React from "react";
import { PokeLounge } from "./Styles";
import Pokemon from "./Pokemon";
export default function PokeTeamContainer(props) {
  const renderPokemon = () => {
    return props.pokemon.map(p => {
      return (
        <Pokemon
          id={p.id}
          name={p.name}
          key={p.name}
          spriteURL={p.spriteURL}
          buttonLabel={"Remove"}
          handlePokemonClick={props.handleRemovePokemon}
        />
      );
    });
  };

  return (
    <PokeLounge>
      <h1>Team Lounge</h1>
      {renderPokemon()}
    </PokeLounge>
  );
}
