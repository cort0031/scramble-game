/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
    const copy = [...src]
  
    const length = copy.length
    for (let i = 0; i < length; i++) {
      const x = copy[i]
      const y = Math.floor(Math.random() * length)
      const z = copy[y]
      copy[i] = z
      copy[y] = x
    }
  
    if (typeof src === 'string') {
      return copy.join('')
    }
  
    return copy
  }
  
  /**********************************************
   * YOUR CODE BELOW
   **********************************************/
  
  //Break the UI into components: Main title, Points, Strikes, Submitted Form, Scrambled Words, Textbox Guess, Pass Button Counter, Play Again Button, Scramble Application, Main Application
  
  const words = [
    'crimson',
    'emerald',
    'topaz',
    'opal',
    'alexandrite',
    'amethyst',
    'obsidian',
    'sapphire',
    'castle',
    'gates'
  ];
  
  function Score({ points, strikes }) {
    return (
      <div className="score">
        <div className="pointswrapper">
          <p className="points">{points}</p>
          <h2>Points</h2>
        </div>
        <span className="space"></span>
        <div className="strikeswrapper">
          <p className="strikes">{strikes}</p>
          <h2>Strikes</h2>
        </div>
      </div>
    );
  }
  
  function ScrambledWords({ word }) {
    // Function to shuffle the letters of the word
    const scrambleWord = (word) => {
      const shuffledWord = shuffle([...word]);
      return shuffledWord.join('');
    };
  
    const scrambledWord = scrambleWord(word);
  
    return (
      <div className="scramblewrapper">
        <h1 className="letters">{scrambledWord}</h1>
      </div>
    );
  }
  
  function ScrambleForm({ word, handleGuess, handleSkip, skipCount }) {
    const [userGuess, setUserGuess] = React.useState('');
  
    const handleInputChange = (event) => {
      setUserGuess(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleGuess(userGuess);
      setUserGuess('');
    };
  
    const handleSkipClick = () => {
      handleSkip();
    };
  
    return (
      <div className="scrambleform">
        <form onSubmit={handleSubmit}>
          <input type="text" id="userguess" value={userGuess} onChange={handleInputChange} />
          <button type="button" id="skipbutton" onClick={handleSkipClick}>
            Skip Word ({skipCount} Remaining)
          </button>
        </form>
      </div>
    );
  }
  
  function App() {
    const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const [strikes, setStrikes] = React.useState(0);
    const [skipCount, setSkipCount] = React.useState(3);
  
    const handleGuess = (userGuess) => {
      const originalWord = words[currentWordIndex];
      const isCorrectGuess = userGuess.toLowerCase() === originalWord.toLowerCase();
  
      if (isCorrectGuess) {
        console.log('Correct. Next word.');
        setCurrentWordIndex(currentWordIndex + 1);
        setPoints(points + 1); // Update the points
      } else {
        console.log('Wrong. Try again.');
        setStrikes(strikes + 1); // Update the strikes
      }
    };
  
    const handleSkip = () => {
      if (skipCount > 0) {
        console.log('Skipped. Next word.');
        setCurrentWordIndex(currentWordIndex + 1);
        setSkipCount(skipCount - 1); // Update the skip count
      }
    };
  
    const currentWord = words[currentWordIndex];
  
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Welcome to Scramble.</h1>
            <Score points={points} strikes={strikes} /> {/* Pass the points and strikes states */}
            <ScrambledWords word={currentWord} />
            <ScrambleForm
              word={currentWord}
              handleGuess={handleGuess}
              handleSkip={handleSkip}
              skipCount={skipCount}
            />
          </div>
        </div>
      </div>
    );
  }
  
  
  const root = ReactDOM.createRoot(document.querySelector('#root'))
  root.render(<App />)
  