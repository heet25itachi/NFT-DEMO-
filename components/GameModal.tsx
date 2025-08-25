import React, { useState, useEffect } from 'react';
import type { NftData, QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

interface QuizModalProps {
  nftData: NftData;
  onClose: () => void;
}

const POINTS_PER_QUESTION = 100;

export const QuizModal: React.FC<QuizModalProps> = ({ nftData, onClose }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizQuestions = await generateQuiz(nftData.prompt);
        setQuestions(quizQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load the quiz.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [nftData.prompt]);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + POINTS_PER_QUESTION);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };
  
  const renderContent = () => {
      if (isLoading) {
        return <div className="text-center p-8">
            <svg className="animate-spin h-8 w-8 text-brand-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="mt-4 text-gray-300">Generating your quest...</p>
        </div>
      }
      if (error) {
        return <div className="text-center p-8 text-red-400">{error}</div>
      }
      if (questions.length === 0) {
        return <div className="text-center p-8 text-gray-400">No quest available.</div>
      }
      if (currentQuestionIndex >= questions.length) {
          return (
              <div className="text-center p-8">
                  <h3 className="text-2xl font-bold text-brand-accent">Quest Complete!</h3>
                  <p className="text-gray-300 mt-2">You answered {score / POINTS_PER_QUESTION} out of {questions.length} questions correctly.</p>
                  <p className="text-4xl font-bold my-4">{score} Points Earned</p>
                  <button onClick={onClose} className="w-full mt-4 px-8 py-3 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full text-lg">
                      Close
                  </button>
              </div>
          )
      }

      const currentQuestion = questions[currentQuestionIndex];
      return (
        <div>
            <div className="text-center border-b border-white/10 pb-4 mb-4">
                <p className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
                <p className="text-2xl font-bold text-brand-accent">{score} Points</p>
            </div>
            <p className="text-lg font-semibold mb-6 text-left">{currentQuestion.question}</p>
            <div className="space-y-3">
                {currentQuestion.options.map(option => {
                    const isCorrect = option === currentQuestion.correctAnswer;
                    const isSelected = option === selectedAnswer;
                    let buttonClass = 'border-gray-600 bg-brand-surface hover:bg-gray-700';
                    if (isAnswered && isCorrect) {
                        buttonClass = 'border-green-500 bg-green-900/50 text-white';
                    } else if (isAnswered && isSelected && !isCorrect) {
                        buttonClass = 'border-red-500 bg-red-900/50 text-white';
                    }
                    return (
                        <button key={option} onClick={() => handleAnswerSelect(option)} disabled={isAnswered} className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${buttonClass}`}>
                            {option}
                        </button>
                    )
                })}
            </div>
            {isAnswered && (
                <div className="mt-6 p-4 bg-brand-background/50 rounded-lg animate-fade-in-up text-center">
                    <p className="font-bold text-lg">{selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect"}</p>
                    <p className="text-sm text-gray-300 mt-1">{currentQuestion.explanation}</p>
                    <button onClick={handleNextQuestion} className="w-full mt-4 px-8 py-2 bg-brand-primary hover:bg-purple-600 text-white font-bold rounded-full">
                        Next
                    </button>
                </div>
            )}
        </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up">
      <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl shadow-brand-primary/20 m-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white text-3xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center">NFT Quest: The Challenge</h2>
        {renderContent()}
      </div>
    </div>
  );
};
