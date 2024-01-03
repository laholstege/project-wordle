import React from "react";
import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import Input from "../Input";
import Guess from "../Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";
import Keyboard from "../Keyboard/Keyboard";
import Banner from "../Banner/Banner";
import GameStats from "../GameStats/GameStats";

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  // Pick a random word on every pageload.
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  // To make debugging easier, we'll log the solution in the console.
  console.info({ answer });
  const [gameHistory, setGameHistory] = React.useState([]); // [{result: "correct", numGuesses: 3}]
  console.log("gameHistory", gameHistory);
  const addGuess = (guess) => {
    // check
    const checkedGuess = checkGuess(guess, answer);
    const nextGuesses = [...guesses, checkedGuess];
    setGuesses(nextGuesses);
    const isCorrectAnswer = checkIsCorrect(checkedGuess);
    if (isCorrectAnswer) {
      setGameHistory([
        ...gameHistory,
        { result: "correct", numGuesses: nextGuesses.length },
      ]);
    } else if (nextGuesses.length === NUM_OF_GUESSES_ALLOWED) {
      setGameHistory([
        ...gameHistory,
        { result: "incorrect", numGuesses: nextGuesses.length },
      ]);
    }
  };

  const resetGame = () => {
    setGuesses([]);
    setAnswer(sample(WORDS));
  };

  const checkIsCorrect = (guess) => {
    return guess && guess.every((guess) => guess.status === "correct");
  };

  const banner =
    guesses.length > 0 && checkIsCorrect(guesses[guesses.length - 1])
      ? "happy"
      : guesses.length === NUM_OF_GUESSES_ALLOWED
      ? "sad"
      : "";

  const correctGames = gameHistory.filter((game) => game.result === "correct");
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
        <Banner status={banner}>
          {banner === "happy" ? (
            <p>
              <strong>Congratulations!</strong> Got it in{" "}
              <strong>
                {guesses.length > 1 ? `${guesses.length} guesses` : "1 guess"}
              </strong>
              .
            </p>
          ) : (
            <p>
              Sorry, the correct answer is <strong>{answer}</strong>.
            </p>
          )}
          <br />
          <GameStats
            numCorrectGames={correctGames.length}
            numTotalGames={gameHistory.length}
            numTotalGuesses={correctGames.reduce(
              (acc, history) => (acc += history.numGuesses),
              0
            )}
          />
          <button onClick={resetGame}>Play again</button>
        </Banner>
      )}
    </>
  );
}

export default Game;
