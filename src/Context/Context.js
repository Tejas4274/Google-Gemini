import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

// ContextProvider function handles the context state and logic
const ContextProvider = (props) => {
  // State to store user input
  const [input, setInput] = useState("");

  // State to store the most recent prompt
  const [recentPrompt, setRecentPrompt] = useState("");

  // State to store the history of prompts
  const [previousPrompt, setPreviousPrompt] = useState([]);

  // State to control the visibility of the result
  const [showResult, setShowResult] = useState(false);

  // State to control the loading animation
  const [loading, setLoading] = useState(false);

  // State to store the result data
  const [resultData, setResultData] = useState("");

  // Function to simulate typing effect by displaying result word by word
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // Function to reset the chat
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // Function to handle sending the prompt to the Gemini API
  const onSent = async (prompt) => {
    // Reset the result data
    setResultData("");

    // Display loading animation
    setLoading(true);

    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPreviousPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // Process the response to format bold text and line breaks
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");

    // Display the processed response with typing effect
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    // Hide loading animation
    setLoading(false);

    // Reset user input
    setInput("");
  };

  // Context value containing all states and functions
  const contextValue = {
    previousPrompt,
    setPreviousPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  // Return the context provider with the context value
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
