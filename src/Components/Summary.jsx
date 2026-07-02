import Winner from "../assets/Cup.jpeg";
import Questions from "../Questions.js";

export default function Summary({ userAnswer }) {
  // Calculate correct answers by comparing with Questions data
  const correctAnswers = userAnswer.filter((answer, index) => answer === Questions[index].CorrectAnswer ).length;

  // Calculate skipped questions (empty strings)
  const skippedQuestions = userAnswer.filter((answer) => answer === "").length;

  // Calculate wrong answers (including skipped questions)
  const wrongAnswers = Questions.length - correctAnswers;

  // Calculate score percentage
  const scorePercentage = Math.round((correctAnswers / Questions.length) * 100);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 h-[400px] w-[690px] mt-4 items-center justify-center m-auto rounded-lg shadow-lg">
      <h1 className="justify-center items-center mx-auto flex text-4xl py-4 font-bold text-blue-800">
        Quiz Completed!
      </h1>
      <img
        src={Winner}
        alt="CupWinner"
        className="w-[100px] h-[90px] items-center justify-center m-auto rounded-full mb-6"
      />

      <div className="flex justify-center items-center px-4 pt-2 gap-4 mb-4">
        {/* Result Button - Shows actual score */}
        <button
          className="
          p-4 flex items-center justify-center 
          text-2xl font-bold text-white 
          bg-gradient-to-r from-purple-600 to-indigo-700 
          rounded-3xl shadow-lg 
          hover:shadow-xl hover:scale-105 
          transition-all duration-300 
          border-2 border-purple-300 
          relative overflow-hidden
          group
          w-[270px] h-[80px]
        "
        >
          <span className="z-10">Score: {scorePercentage}%</span>
          <span
            className="
            absolute inset-0 bg-gradient-to-r 
            from-purple-500 to-transparent 
            opacity-0 group-hover:opacity-70 
            transition-opacity duration-500
          "
          ></span>
        </button>
      </div>

      <div className="bg-white bg-opacity-50 rounded-lg mx-4 p-4">
        <h2 className="text-center font-bold text-xl text-blue-800 ">
          Detailed Results:
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center">
            <p className="font-semibold">Correct Answers</p>
            <p className="text-green-600 font-bold">
              {correctAnswers}/{Questions.length}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Wrong Answers</p>
            <p className="text-red-600 font-bold">
              {wrongAnswers}/{Questions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
