import React from "react";

function Input({ checkGuess }) {
  const [input, setInput] = React.useState("");

  return (
    <form
      className="guess-input-wrapper"
      id="guess-input-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (input.length !== 5)
          return alert("Guess must be 5 characters long.");
        checkGuess(input);
        setInput("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        maxLength={5}
        minLength={5}
        pattern="^[a-zA-Z]{5}$"
      />
    </form>
  );
}

export default Input;
