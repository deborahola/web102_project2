import '/src/Card.css'

const Card = ({ question, answer, explanation, image, category, isFlipped, onClick }) => {

  function getColorByCategory(category) {
    switch (category) {
      case "Geography":
        return "#b3e5fc"; // light blue or other light blue = #bbdefb
      case "Astronomy":
        return "#d1c4e9"; // lavender
      case "Biology":
        return "#c8e6c9"; // light green
      case "Marine Biology":
        return "#80deea"; // teal
      case "Zoology":
        return "#ffccbc"; // peach
      case "Human Anatomy":
        return "#f8bbd0"; // pink
      case "Animal Adaptation":
        return "#fff9c4"; // light yellow or light orange = #ffe0b2
      default:
        return "#fef6e4"; // beige
    }
  }

  const bgColor = getColorByCategory(category);

  return (

    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>

      <div className="card-inner">

        <div className="card-front" style={{ backgroundColor: bgColor }}>
          <p>{question}</p>
        </div>
        
        <div className="card-back" style={{ backgroundColor: bgColor }}>
          <h2>{answer}</h2>
          <p className="explanation">{explanation}</p>
          <img src={image} alt={answer} />
        </div>

      </div>

    </div>

  )

}

export default Card
