import React, { useState } from "react";
import { PokeCard, PokeButton } from "./Styles";
import pokeball from "./assets/pokeball.png";

export default function Pokemon(props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClick = e => {
    props.handlePokemonClick(props);
  };

  const handleImgLoad = () => {
    setImgLoaded(true);
  };

  return (
    <PokeCard>
      <h2>{props.name}</h2>
      <img
        src={pokeball}
        height={90}
        width={90}
        style={{ visibility: !imgLoaded ? "visible" : "hidden" }}
      />
      <img
        src={props.spriteURL}
        height={90}
        width={90}
        style={{ visibility: imgLoaded ? "visible" : "hidden" }}
        onLoad={handleImgLoad}
      />
      <PokeButton onClick={handleClick}>{props.buttonLabel}</PokeButton>
    </PokeCard>
  );
}
