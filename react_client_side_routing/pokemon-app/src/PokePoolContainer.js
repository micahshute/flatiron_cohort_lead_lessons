import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import { PokeButton } from "./Styles";
import Loadable from "./hocs/Loadable";

function PokePoolContainer(props) {
  const [pokemon, setPokemon] = useState([]);
  const [nextURL, setNextURL] = useState("https://pokeapi.co/api/v2/pokemon");
  const [prevURL, setPrevURL] = useState("");
  const [getPrevPokemon, setGetPrevPokemon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getNextPokemon, setGetNextPokemon] = useState(true);

  useEffect(() => {
    console.log(props)
    async function mapNewLocationToData(initialArr) {
      return Promise.all(
        initialArr.map(pinfo => {
          return fetch(pinfo.url).then(res => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          });
        })
      );
    }

    // if getNext is true, set URL to nextURL
    // else set url to prevURL
    async function fetchPokemon(getNext) {
      props.setIsLoading(true);
      const url = getNext ? nextURL : prevURL;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        setNextURL(data.next);
        setPrevURL(data.previous);
        const initialPokeList = data.results;

        const pokeFullDataList = await mapNewLocationToData(initialPokeList);
        setPokemon(pokeFullDataList);
        props.setIsLoading(false);
      } catch (err) {
        props.setIsLoading(false);
        console.log(err);
        alert(err.status);
      }
    }
    if (getNextPokemon) {
      fetchPokemon(true);
      setGetNextPokemon(false);
    } else if (getPrevPokemon) {
      fetchPokemon(false);
      setGetPrevPokemon(false);
    }
  }, [getNextPokemon, getPrevPokemon, nextURL, prevURL]);

  const renderPokeCards = () => {
    return pokemon.map(p => {
      return (
        <Pokemon
          id={p.id}
          name={p.name}
          key={p.name}
          spriteURL={p.sprites.front_default}
          handlePokemonClick={props.handleChoosePokemon}
          buttonLabel={"Choose"}
        />
      );
    });
  };

  const handleNextPage = e => {
    setGetNextPokemon(true);
  };

  const handlePrevPage = e => {
    setGetPrevPokemon(true);
  };

  const renderButtons = () => {
    return (
      <div>
        <PokeButton onClick={handlePrevPage} disabled={!prevURL}>
          Previous
        </PokeButton>
        <PokeButton onClick={handleNextPage} disable={!nextURL}>
          Next
        </PokeButton>
      </div>
    );
  };

  return (
    <div>
      {renderPokeCards()}
      {renderButtons()}
    </div>
  );
}
export default Loadable(PokePoolContainer);
