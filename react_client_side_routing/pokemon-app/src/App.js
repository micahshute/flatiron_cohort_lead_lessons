import React, { useState } from "react";
import PokeTeamContainer from "./PokeTeamContainer";
import PokePoolContainer from "./PokePoolContainer";
import SearchPokemon from './SearchPokemon'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import "./App.css";

export default function App() {
  const [chosenPokemon, setChosenPokemon] = useState([]);

  const handleRemovePokemon = pokeObj => {
    const newPokemon = chosenPokemon.filter(p => p.id !== pokeObj.id);
    setChosenPokemon(newPokemon);
  };

  const handleChoosePokemon = pokeObj => {
    if (chosenPokemon.length > 5) {
      return;
    }

    if (!!chosenPokemon.find(p => p.id === pokeObj.id)) {
      return;
    }
    const newPokemon = [...chosenPokemon, pokeObj];
    setChosenPokemon(newPokemon);
    
  };

  return (
    <Router>
      <div className="App">
          <PokeTeamContainer
            pokemon={chosenPokemon}
            handleRemovePokemon={handleRemovePokemon}
          />

          <Link to="/search">Search</Link>
          <br/>
          <Link to="/">Browse</Link>

         <Switch>
            <Route 
              path="/search" 
              render={props => (
                <SearchPokemon {...props} handleChoosePokemon={handleChoosePokemon} />
              )}
            
            />

            <Route 
              path="/"
              render={props => (
                <PokePoolContainer {...props} handleChoosePokemon={handleChoosePokemon}/>
              )}
            >
            </Route>
          </Switch>
          
        
      </div>
    </Router>
  );
}
