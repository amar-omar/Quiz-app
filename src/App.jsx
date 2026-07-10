import { useState } from "react";
import Header from "./Components/Header";
import "./App.css";
import Quiz from "./Components/Quiz";
import QuestionTimer from "./Components/QuestionTimer";

function App() {
  return (
    <>

    <div className="bg-blue-100">
      <Header />
      <Quiz />
      </div>
    </>
  );
}

export default App;
