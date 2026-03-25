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
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Create New Quiz</h2>
        <p className="text-gray-500 text-sm mt-1">Fill in the details below to launch a new quiz.</p>
      </div>
      
      {/* Quiz Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            placeholder="e.g., General Knowledge Challenge"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            rows="3"
            placeholder="Describe what this quiz is about..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Reward (Coins)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🪙</span>
            <input
              type="number"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              min="0"
              required
            />
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Questions</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100">+</span>
            Add Question
          </button>
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-200">
                Question {qIndex + 1}
              </span>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Type your question here..."
                value={question.text}
                onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition-all"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition-all"
                    required
                  />
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Correct Answer</label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white transition-all"
                  required
                >
                  <option value="">Select correct option</option>
                  {question.options.map((option, idx) => (
                    option && <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#ff8c00] text-white font-bold text-lg shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200"
      >
        Create Quiz
      </button>
    </form>
  );
};

export default AddQuizForm;