// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/quiz")
//       .then((response) => {
//         setQuestions(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching questions:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>DSA Quiz</h1>
//       {questions.length > 0 ? (
//         questions.map((q, index) => (
//           <div
//             key={index}
//             style={{
//               marginBottom: "20px",
//               border: "1px solid black",
//               padding: "10px",
//               borderRadius: "5px",
//               backgroundColor: "#f9f9f9",
//             }}
//           >
//             <h3>{q.title}</h3>
//             <p><strong>Difficulty:</strong> {q.difficulty}</p>
//             <a href={q.link} target="_blank" rel="noopener noreferrer">
//               Solve on Codeforces
//             </a>
//           </div>
//         ))
//       ) : (
//         <p>Loading questions...</p>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/quiz")  // Ensure FastAPI is running on port 8000!
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, []);

  const handleSelect = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct_answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid black", padding: "10px" }}>
            <h3 dangerouslySetInnerHTML={{ __html: q.question }} />
            {q.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}

                  value={option}
                  onChange={() => handleSelect(index, option)}
                />
                <label dangerouslySetInnerHTML={{ __html: option }} />
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}

      <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px", fontSize: "16px" }}>
        Submit Answers
      </button>

      {score !== null && <h2>Your Score: {score}/{questions.length}</h2>}
    </div>
  );
}

export default App;
