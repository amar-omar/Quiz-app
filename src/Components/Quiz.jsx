import { useState, useEffect } from "react";
import Questions from "../Questions";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "./button";
import Summary from "./Summary";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswer, setUserAnswer] = useState(
    Array(Questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const activeQuestionIndex = userAnswer.findIndex(
    (answer) => answer === null
  );
  const currentQuestionIndex =
    activeQuestionIndex === -1
      ? Questions.length - 1
      : activeQuestionIndex;

  const counter = currentQuestionIndex + 1;

  const quizIsComplete = userAnswer.every((answer) => answer !== null);
  const allQuestionsAnswered = userAnswer.every(
    (answer) => answer !== null
  );

  useEffect(() => {
    if (!isTimerActive || quizIsComplete) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        setIsTimerActive(false);

        const newAnswers = [...userAnswer];
        newAnswers[currentQuestionIndex] = "";

        setUserAnswer(newAnswers);
        setTimeLeft(10);
        setIsTimerActive(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    timeLeft,
    isTimerActive,
    currentQuestionIndex,
    quizIsComplete,
    userAnswer,
  ]);

  function handleSelectAnswer(selectedAnswer) {
    setIsTimerActive(false);
    setAnswerState("answered");

    const newAnswers = [...userAnswer];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswer(newAnswers);

    setTimeout(() => {
      const isCorrect =
        selectedAnswer.trim() ===
        Questions[currentQuestionIndex].CorrectAnswer.trim();

      setAnswerState(isCorrect ? "correct" : "wrong");

      setTimeout(() => {
        setAnswerState("");
        setTimeLeft(10);
        setIsTimerActive(true);
      }, 1000);
    }, 1000);
  }

  function handlePrevAnswer() {
    if (currentQuestionIndex > 0) {
      setIsTimerActive(false);
      setAnswerState("");
      setIsTimerActive(true);
    }
  }

  function handleNextAnswer() {
    if (userAnswer[currentQuestionIndex] === null) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
      return;
    }

    setIsTimerActive(false);
    setTimeLeft(10);
    setAnswerState("");
    setIsTimerActive(true);
  }

  function handleSubmit() {
    if (userAnswer.some((answer) => answer === null)) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
    } else {
      setUserAnswer([...userAnswer]);
    }
  }

  if (quizIsComplete) {
    return <Summary userAnswer={userAnswer} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-6">
      <div className="w-full max-w-3xl rounded-xl bg-blue-200 shadow-xl p-4 sm:p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 text-center">
            Question {counter}/{Questions.length}
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">
            {timeLeft}s
          </div>
        </div>

        {/* Warning */}
        {showWarning && (
          <div className="bg-yellow-500 text-white rounded-lg p-3 text-center text-sm sm:text-base mb-4">
            Please answer the current question before proceeding!
          </div>
        )}

        {/* Question */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 text-center min-h-[100px] flex items-center justify-center px-2">
          {Questions[currentQuestionIndex].question}
        </h2>

        {/* Answers */}
        <ul className="mt-5 space-y-3">
          {Questions[currentQuestionIndex].Answers.map((answer) => {
            let buttonClasses =
              "w-full py-3 sm:py-4 px-4 rounded-2xl shadow-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 break-words whitespace-normal ";

            const isSelected =
              userAnswer[currentQuestionIndex] === answer;

            if (answerState === "answered" && isSelected) {
              buttonClasses += "bg-blue-600 text-white";
            } else if (answerState === "correct" && isSelected) {
              buttonClasses += "bg-green-500 text-white";
            } else if (answerState === "wrong" && isSelected) {
              buttonClasses += "bg-red-500 text-white";
            } else {
              buttonClasses +=
                "bg-blue-100 hover:bg-blue-400 text-black";
            }

            return (
              <li key={answer}>
                <Button
                  onClick={() => handleSelectAnswer(answer)}
                  className={buttonClasses}
                  disabled={answerState !== "" && !isSelected}
                >
                  {answer}
                </Button>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">

          {currentQuestionIndex > 0 ? (
            <button
              onClick={handlePrevAnswer}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition"
            >
              <FaArrowLeft size={18} />
            </button>
          ) : (
            <div />
          )}

          {currentQuestionIndex === Questions.length - 1 &&
          allQuestionsAnswered ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition text-sm sm:text-base"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNextAnswer}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition"
              disabled={
                currentQuestionIndex === Questions.length - 1 &&
                !allQuestionsAnswered
              }
            >
              <FaArrowRight size={18} />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}