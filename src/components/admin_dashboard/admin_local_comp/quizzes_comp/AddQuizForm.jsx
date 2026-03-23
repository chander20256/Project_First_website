import { useState } from 'react';
import { createQuiz } from "../../../../services/api";

const AddQuizForm = ({ onQuizCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState(10);
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Filter out incomplete questions
    const validQuestions = questions.filter(q => 
      q.text.trim() && 
      q.options.every(opt => opt.trim()) && 
      q.correctAnswer
    );

    if (validQuestions.length === 0) {
      alert('Please add at least one complete question');
      return;
    }

    const quizData = {
      title,
      description,
      reward: Number(reward),
      questions: validQuestions
    };

    try {
      await createQuiz(quizData);
      alert('Quiz created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setReward(10);
      setQuestions([{ text: '', options: ['', '', '', ''], correctAnswer: '' }]);
      if (onQuizCreated) onQuizCreated();
    } catch (error) {
      alert('Failed to create quiz: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold">Create New Quiz</h2>
      
      {/* Quiz Info */}
      <div>
        <label className="block text-sm font-medium mb-2">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Reward (Coins)</label>
        <input
          type="number"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          className="w-full p-2 border rounded"
          min="0"
          required
        />
      </div>

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Questions</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Question
          </button>
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="border p-4 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Question {qIndex + 1}</h4>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Question text"
                value={question.text}
                onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />

              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                ))}
              </div>

              <select
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select correct answer</option>
                {question.options.map((option, idx) => (
                  option && <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Create Quiz
      </button>
    </form>
  );
};

export default AddQuizForm;