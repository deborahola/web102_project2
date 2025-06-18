import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import { cards } from './data'

const App = () => {

  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function handleNext() {
    // Cards showing randomly:
    let newIndex = Math.floor(Math.random() * cards.length);
    while (newIndex === index) {
      newIndex = Math.floor(Math.random() * cards.length);
    }

    // Cards showing in order:
    // const newIndex = (index + 1) % cards.length; // go back to 0 when finished

    setIndex(newIndex);
    setIsFlipped(false); // reset to the front of next card when next button is clicked
  }

  return (

    <div className="app">

      <h1>Fun Facts!</h1>
      <p className="description">Test your trivia knowledge with cool facts!</p>
      <p className="count">Total # of Cards: {cards.length}</p>

      {/* (Optional) Only makes sense to use this instead when showing cards in order: */}
      {/* <p className="count">Card {index + 1} of {cards.length}</p> */}

      <Card
        key={index}
        {...cards[index]}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)}
      />

      <button onClick={handleNext}>Next &nbsp;➡️</button>

    </div>

  )

}

export default App
