import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/quiz").then((response) => {
      setQuestions(response.data);
    });
  }, []);

  const handleSelect = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Answers submitted!");
  };

  return (
    <div>
      <h1>DSA Quiz</h1>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid black", padding: "10px" }}>
            <h3>{q.title}</h3>
            <p>Difficulty: {q.difficulty}</p>
            <p>Options:</p>
            {q.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleSelect(index, option)}
                />
                {option}
              </div>
            ))}
            <a href={q.link} target="_blank" rel="noopener noreferrer">Solve on Codeforces</a>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}

      <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Submit Answers
      </button>
    </div>
  );
}

export default App;