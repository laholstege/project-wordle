import React from "react";

function Input({ checkGuess }) {
  const [guess, setGuess] = React.useState("");

  return (
    <form
      className="guess-input-wrapper"
      id="guess-input-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (guess.length !== 5)
          return alert("Guess must be 5 characters long.");
        checkGuess(guess);
        setGuess("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        maxLength={5}
        minLength={5}
        pattern="^[a-zA-Z]{5}$"
      />
    </form>
  );
}

export default Input;
