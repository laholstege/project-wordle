import React from "react";
import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import Guess from "../Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Keyboard from "../Keyboard/Keyboard";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);

  const addGuess = (guess) => {
    const checkedGuess = checkGuess(guess, answer);
    setGuesses([...guesses, checkedGuess]);
  };

  const success =
    guesses.length > 0 &&
    guesses[guesses.length - 1].every((guess) => guess.status === "correct");
  const gameOver = guesses.length === NUM_OF_GUESSES_ALLOWED;

  return (
    <>
      <div className="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((i) => {
          return <Guess guess={guesses[i]} key={i}></Guess>; // i BELIEVE this is fine because these should not move or be rerendered
        })}
      </div>
      <Input checkGuess={addGuess} disabled={success || gameOver} />
      <Keyboard guesses={guesses} />
      {success && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{guesses.length} guesses</strong>.
          </p>
        </div>
      )}
      {gameOver && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      )}
    </>
  );
}

export default Game;
