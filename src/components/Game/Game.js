import React from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import Guess from "../Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const checkGuess = (guess) => {
    console.log(guess);
    const nextGuess = {
      id: crypto.randomUUID(),
      guess: guess,
    };
    const nextGuesses = [...guesses, nextGuess];
    setGuesses(nextGuesses);
  };

  return (
    <>
      <div className="guess-results">
        {guesses.map(({ guess, id }) => {
          return <Guess guess={guess} key={id} />;
        })}
        {range(NUM_OF_GUESSES_ALLOWED - guesses.length).map((i) => {
          return <Guess guess="" key={i}></Guess>;
        })}
      </div>
      <Input checkGuess={checkGuess} />
    </>
  );
}

export default Game;
