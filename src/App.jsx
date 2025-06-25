import { useState } from 'react'
import './App.css'
import Card from './components/Card'
// import { cards } from './data'
import { cards as originalCards } from './data'

const App = () => {

  const [cards, setCards] = useState(originalCards);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const currentCard = cards[index];
  const isAtFirstCard = index === 0;
  const isAtLastCard = index === cards.length - 1;

  function cleanAnswer(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
  }

  const handleSubmitGuess = () => {
    const oldfeedback = feedback;
    
    const userInput = cleanAnswer(guess);
    const actualAnswer = cleanAnswer(currentCard.answer);
    const isCorrect = userInput === actualAnswer; // more accurate
    //const isCorrect = userInput === actualAnswer || userInput.includes(actualAnswer); // allows for user to have partial correct matching kinda

    if (isCorrect) {
      setFeedback('correct');
      setIsFlipped(true);
      if (oldfeedback !== 'correct') {
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
      }
    } else {
      setFeedback('incorrect');
      setCurrentStreak(0);
    }

    // setFeedback(isCorrect ? 'correct' : 'incorrect');
    // if (isCorrect) setIsFlipped(true); // optional, user could just manually flip instead of automatic flip when correct
  };

  const handleNext = () => {
    if (!isAtLastCard) {
      setIndex(index + 1);
      resetCard();
    }
  };

  const handlePrev = () => {
    if (!isAtFirstCard) {
      setIndex(index - 1);
      resetCard();
    }
  };

  const resetCard = () => {
    setIsFlipped(false);
    setGuess('');
    setFeedback(null);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIndex(0);
    resetCard();
  };

  const handleRestart = () => {
    setIndex(0);
    resetCard();
    setCurrentStreak(0);
  };

  // function handleNext() {
  //   // Cards showing randomly:
  //   let newIndex = Math.floor(Math.random() * cards.length);
  //   while (newIndex === index) {
  //     newIndex = Math.floor(Math.random() * cards.length);
  //   }

  //   // Cards showing in order:
  //   // const newIndex = (index + 1) % cards.length; // go back to 0 when finished

  //   setIndex(newIndex);
  //   setIsFlipped(false); // reset to the front of next card when next button is clicked
  // }

  return (

    <div className="app">

      <h1>Fun Facts!</h1>
      <p className="description">Test your trivia knowledge with cool facts!</p>
      {/* <p className="count">Total # of Cards: {cards.length}</p> */}

      {/* (Optional) Only makes sense to use this instead when showing cards in order: */}
      {/* <p className="count">Card {index + 1} of {cards.length}</p> */}
      
      <p className="count">Card {index + 1} of {cards.length} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Current Streak: {currentStreak} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Longest Streak: {longestStreak}</p>

      {/* <Card
        key={index}
        {...cards[index]}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)}
      />

      <button onClick={handleNext}>Next &nbsp;➡️</button> */}

      <Card
        key={index}
        {...currentCard}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)}
      />

      <div className="guess-section">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your answer here"
        />
        <button onClick={handleSubmitGuess}>Submit Guess 🤔</button>
        {feedback && <p className={`feedback ${feedback}`}>{feedback === 'correct' ? '✅ Correct!' : '❌ Try again!'}</p>}
      </div>

      <div className="nav-buttons">
        <button onClick={handlePrev} disabled={isAtFirstCard} className={isAtFirstCard ? 'disabled' : ''}>⬅️ Back</button>
        <button onClick={handleNext} disabled={isAtLastCard} className={isAtLastCard ? 'disabled' : ''}>Next ➡️</button>
        <button onClick={handleRestart}>Restart 🔄</button>
        <button onClick={handleShuffle}>Shuffle 🔀</button>
      </div>

    </div>

  )

}

export default App
