import { useState, useEffect } from "react";
import Questions from "../Questions";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "./button";
import Summary from "./Summary";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswer, setUserAnswer] = useState(Array(Questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const activeQuestionIndex = userAnswer.findIndex((answer) => answer === null);
  const currentQuestionIndex = activeQuestionIndex === -1 ? Questions.length - 1 : activeQuestionIndex;
  const counter = currentQuestionIndex + 1;
  const quizIsComplete = userAnswer.every((answer) => answer !== null);
  const allQuestionsAnswered = userAnswer.every((answer) => answer !== null);

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || quizIsComplete) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setIsTimerActive(false);
        const newAnswers = [...userAnswer];
        newAnswers[currentQuestionIndex] = ""; // Mark as skipped
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
    <div className="min-h-[420px] w-full max-w-[690px] mt-4 items-center justify-center m-auto rounded-lg shadow-lg bg-blue-300 p-4">
      <div className="flex justify-between items-center px-4 pt-2">
        <h1 className="text-2xl font-bold text-blue-800">
          Question: {counter}/{Questions.length}
        </h1>
        <div className="text-xl font-bold text-red-600">
          Time Left: {timeLeft}s
        </div>
      </div>

      {showWarning && (
        <div className="bg-yellow-500 text-white p-2 rounded-md text-center my-2">
          Please answer the current question before proceeding!
        </div>
      )}

      <h1 className="justify-center items-center mx-auto flex py-2 text-2xl font-bold text-blue-800 text-center min-h-[80px]">
        {Questions[currentQuestionIndex].question}
      </h1>

      <ul className="mb-4">
        {Questions[currentQuestionIndex].Answers.map((answer) => {
          let buttonClasses =
            "py-4 rounded-3xl shadow-xl m-2 font-bold transition-colors duration-300 w-full ";
          const isSelected = userAnswer[currentQuestionIndex] === answer;

          if (answerState === "answered" && isSelected) {
            buttonClasses += "bg-blue-600 text-white";
          } else if (answerState === "correct" && isSelected) {
            buttonClasses += "bg-green-500 text-white";
          } else if (answerState === "wrong" && isSelected) {
            buttonClasses += "bg-red-500 text-white";
          } else {
            buttonClasses += "bg-blue-100 hover:bg-blue-400 text-black";
          }

          return (
            <li key={answer} className="flex justify-center items-center">
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

      <div className="flex items-center justify-between p-2">
        {currentQuestionIndex > 0 ? (
          <button
            onClick={handlePrevAnswer}
            className="bg-blue-400 px-3 py-2 rounded-xl shadow-xl hover:bg-blue-500 transition-colors"
          >
            <FaArrowLeft />
          </button>
        ) : (
          <div></div>
        )}

        {currentQuestionIndex === Questions.length - 1 &&
        allQuestionsAnswered ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow-xl font-bold transition-colors"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNextAnswer}
            className="bg-blue-400 px-3 py-2 rounded-xl shadow-xl hover:bg-blue-500 transition-colors"
            disabled={
              currentQuestionIndex === Questions.length - 1 &&
              !allQuestionsAnswered
            }
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
