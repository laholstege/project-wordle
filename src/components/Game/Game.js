import React from "react";
import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import Guess from "../Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const addGuess = (guess) => {
    setGuesses([...guesses, checkGuess(guess, answer)]);
  };

  return (
    <>
      <div className="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((i) => {
          return <Guess guess={guesses[i]} key={i}></Guess>; // i BELIEVE this is fine because these should not move or be rerendered
        })}
      </div>
      <Input checkGuess={addGuess} />
    </>
  );
}

export default Game;
