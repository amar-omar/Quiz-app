import { useState } from "react";
import Header from "./Components/Header";
import "./App.css";
import Quiz from "./Components/Quiz";
import QuestionTimer from "./Components/QuestionTimer";

function App() {
  return (
    <>

    <div className="bg-blue-300 h-screen">
      <Header />
      <Quiz />
      </div>
    </>
  );
}

export default App;
