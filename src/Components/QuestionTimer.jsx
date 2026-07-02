import React from "react";

export default function QuestionTimer({TimeOut , onTimeOut}) {

  
setTimeout(onTimeOut, TimeOut);

  return <progress />;
}
