import Winner from "../assets/Cup.jpeg";
import Questions from "../Questions.js";

export default function Summary({ userAnswer }) {
  const correctAnswers = userAnswer.filter(
    (answer, index) => answer === Questions[index].CorrectAnswer
  ).length;

  const skippedQuestions = userAnswer.filter(
    (answer) => answer === ""
  ).length;

  const wrongAnswers = Questions.length - correctAnswers;

  const scorePercentage = Math.round(
    (correctAnswers / Questions.length) * 100
  );

  return (
    <div
      className="
      w-[95%] max-w-2xl
      mx-auto mt-6
      rounded-2xl
      bg-gradient-to-b from-blue-100 to-blue-300
      shadow-xl
      p-5 sm:p-8
      "
    >
      <h1
        className="
        text-center
        text-2xl sm:text-3xl md:text-4xl
        font-bold
        text-blue-800
        "
      >
        Quiz Completed!
      </h1>

      <img
        src={Winner}
        alt="Cup Winner"
        className="
        w-20 h-20
        sm:w-24 sm:h-24
        md:w-28 md:h-28
        rounded-full
        mx-auto
        my-6
        object-cover
        "
      />

      {/* Score */}
      <div className="flex justify-center mb-6">
        <button
          className="
          relative overflow-hidden group
          w-full sm:w-80
          py-4
          rounded-3xl
          bg-gradient-to-r from-purple-600 to-indigo-700
          text-white
          text-xl sm:text-2xl
          font-bold
          shadow-lg
          hover:scale-105
          transition-all
          duration-300
          border-2 border-purple-300
          "
        >
          <span className="relative z-10">
            Score: {scorePercentage}%
          </span>

          <span
            className="
            absolute inset-0
            bg-gradient-to-r
            from-purple-500 to-transparent
            opacity-0
            group-hover:opacity-70
            transition-opacity
            duration-500
            "
          />
        </button>
      </div>

      {/* Details */}
      <div className="bg-white/60 rounded-xl p-5">
        <h2
          className="
          text-center
          text-lg sm:text-xl
          font-bold
          text-blue-800
          mb-5
          "
        >
          Detailed Results
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="font-semibold text-sm sm:text-base">
              Correct Answers
            </p>
            <p className="text-green-600 font-bold text-lg">
              {correctAnswers}/{Questions.length}
            </p>
          </div>

          <div className="text-center">
            <p className="font-semibold text-sm sm:text-base">
              Wrong Answers
            </p>
            <p className="text-red-600 font-bold text-lg">
              {wrongAnswers}/{Questions.length}
            </p>
          </div>

          <div className="text-center">
            <p className="font-semibold text-sm sm:text-base">
              Skipped Questions
            </p>
            <p className="text-yellow-600 font-bold text-lg">
              {skippedQuestions}/{Questions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}