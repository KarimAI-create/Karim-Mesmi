import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion, AdFormat } from '../types';
import { CheckCircle, XCircle, HelpCircle, Loader2, Wand2 } from 'lucide-react';
import { AdUnit } from '../components/AdUnit';

export const Practice: React.FC = () => {
  const [topic, setTopic] = useState('Transitive and Intransitive Verbs');
  const [level, setLevel] = useState('Intermediate');
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setShowResults(false);
    setAnswers({});
    setQuiz([]); // Clear previous
    
    const questions = await generateQuiz(topic, level);
    setQuiz(questions);
    setLoading(false);
  };

  const handleSelectAnswer = (qIndex: number, aIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qIndex]: aIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-screen">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-700 rounded-full mb-4">
            <Wand2 size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mr. Karim's Quiz Maker</h1>
        <p className="text-gray-600">Create unlimited quizzes to practice your grammar!</p>
      </div>

      {/* Generator Controls */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <input 
              type="text" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              placeholder="Enter a topic..."
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select 
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleGenerate}
              disabled={loading || !topic}
              className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Create Quiz'}
            </button>
          </div>
        </div>
      </div>

      {/* Ad Slot above quiz content */}
      <AdUnit format={AdFormat.Banner} slotId="555666777" className="mb-8" />

      {/* Quiz Content */}
      {quiz.length > 0 && (
        <div className="space-y-6 animate-fade-in">
          {quiz.map((q, qIdx) => (
            <div key={qIdx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex gap-2">
                <span className="text-primary">Q{qIdx + 1}.</span> {q.question}
              </h3>
              <div className="space-y-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = answers[qIdx] === optIdx;
                  const isCorrect = q.correctAnswer === optIdx;
                  
                  let btnClass = "w-full text-left p-3 rounded-lg border transition-all ";
                  
                  if (showResults) {
                    if (isCorrect) btnClass += "bg-green-50 border-green-500 text-green-700";
                    else if (isSelected && !isCorrect) btnClass += "bg-red-50 border-red-500 text-red-700";
                    else btnClass += "border-gray-200 opacity-50";
                  } else {
                    if (isSelected) btnClass += "bg-blue-50 border-primary text-primary ring-1 ring-primary";
                    else btnClass += "border-gray-200 hover:bg-gray-50 hover:border-gray-300";
                  }

                  return (
                    <button 
                      key={optIdx}
                      onClick={() => handleSelectAnswer(qIdx, optIdx)}
                      disabled={showResults}
                      className={btnClass}
                    >
                      <div className="flex justify-between items-center">
                        <span>{opt}</span>
                        {showResults && isCorrect && <CheckCircle size={18} className="text-green-600" />}
                        {showResults && isSelected && !isCorrect && <XCircle size={18} className="text-red-600" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {showResults && (
                <div className="mt-4 p-3 bg-amber-50 text-amber-800 text-sm rounded-lg flex gap-2 items-start">
                  <HelpCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-col items-center gap-4 mt-8 mb-12">
            {!showResults ? (
               <button 
               onClick={() => setShowResults(true)}
               disabled={Object.keys(answers).length < quiz.length}
               className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-105"
             >
               Check Answers
             </button>
            ) : (
              <div className="text-center w-full bg-white p-8 rounded-xl shadow-lg border border-indigo-100">
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  You scored {calculateScore()} out of {quiz.length}!
                </p>
                {calculateScore() === quiz.length && <p className="text-fun mb-4">🎉 Excellent work! Mr. Karim would be proud!</p>}
                <button 
                  onClick={() => {
                     setQuiz([]); 
                     setShowResults(false);
                  }}
                  className="text-primary font-bold hover:underline"
                >
                  Try Another Quiz
                </button>
              </div>
            )}
           
          </div>
        </div>
      )}
      
      {/* Bottom Ad */}
      {quiz.length > 0 && <AdUnit format={AdFormat.Banner} slotId="888999000" />}
    </div>
  );
};