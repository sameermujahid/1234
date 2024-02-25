import React, { useState, useEffect } from 'react';

const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    fetch('http://127.0.0.1:8000/api/questions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        return response.json();
      })
      .then(data => {
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  return (
    <div>
      <h1>Questionnaire</h1>
      <form>
        {questions.map(question => (
          <div key={question.id}>
            <label htmlFor={`question_${question.id}`}>{question.description}</label>
            {question.inputtype === 'Text' && (
              <input
                type="text"
                id={`question_${question.id}`}
                name={`question_${question.id}`}
                placeholder="Enter your answer"
              />
            )}
            {question.inputtype === 'Number' && (
              <input
                type="number"
                id={`question_${question.id}`}
                name={`question_${question.id}`}
                placeholder="Enter your answer"
              />
            )}
            {question.inputtype === 'Date' && (
              <input
                type="date"
                id={`question_${question.id}`}
                name={`question_${question.id}`}
              />
            )}
            {question.inputtype === 'Check' && (
              <input
                type="checkbox"
                id={`question_${question.id}`}
                name={`question_${question.id}`}
              />
            )}
            {question.inputtype === 'Radio' && (
              <div>
                {question.inputoptions.split(',').map(option => (
                  <div key={option}>
                    <input
                      type="radio"
                      id={`question_${question.id}_${option}`}
                      name={`question_${question.id}`}
                      value={option}
                    />
                    <label htmlFor={`question_${question.id}_${option}`}>{option}</label>
                  </div>
                ))}
              </div>
            )}
            {/* Add more input types as needed */}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
