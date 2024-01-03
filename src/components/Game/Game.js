import React from "react";
import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import Guess from "../Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Keyboard from "../Keyboard/Keyboard";

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  // Pick a random word on every pageload.
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });

  const addGuess = (guess) => {
    const checkedGuess = checkGuess(guess, answer);
    setGuesses([...guesses, checkedGuess]);
  };

  const resetGame = () => {
    setGuesses([]);
    setAnswer(sample(WORDS));
  };

  const banner =
    guesses.length > 0 &&
    guesses[guesses.length - 1].every((guess) => guess.status === "correct")
      ? "happy"
      : guesses.length === NUM_OF_GUESSES_ALLOWED
      ? "sad"
      : "";

  return (
    <>
      <div className="guess-results">
        {range(NUM_OF_GUESSES_ALLOWED).map((i) => {
          return <Guess guess={guesses[i]} key={i}></Guess>; // i BELIEVE this is fine because these should not move or be rerendered
        })}
      </div>
      <Input checkGuess={addGuess} disabled={!!banner} />
      <Keyboard guesses={guesses} />
      {!!banner && (
        <div className={`banner ${banner}`}>
          {banner === "happy" ? (
            <p>
              <strong>Congratulations!</strong> Got it in{" "}
              <strong>{guesses.length} guesses</strong>.
            </p>
          ) : (
            <p>
              Sorry, the correct answer is <strong>{answer}</strong>.
            </p>
          )}
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
    </>
  );
}

export default Game;
