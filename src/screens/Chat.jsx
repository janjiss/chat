

import React, { useState, useCallback } from "react";


function shatGpt() {
    const min = 20;
    const max = 60;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "💩".repeat(randomNumber);
  }

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  console.log(inputValue)

  const sendMessage = useCallback(() => {
    const messageObj = {
        message: inputValue,
        sender: "user",
      };
      
      setInputValue("");
  
      const botMessageObj = {
        message: shatGpt(),
        sender: "bot",
      };
      setMessages([...messages, messageObj, botMessageObj]);
  }, [setInputValue, setMessages, inputValue, messages])

  const sendMessageOnEnter = useCallback((e) => {
    if (e.key === 'Enter') {
        sendMessage()
    }
  }, [sendMessage])

  return (
    <div className="h-screen w-full bg-gray-200 flex flex-col justify-end p-4">
      <div className="flex flex-col">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-900"
              } rounded-lg p-2 my-2 max-w-xs`}
            >
              <p className="text-sm">{message.message}</p>
            </div>
          );
        })}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={sendMessageOnEnter}
          className="bg-gray-100 p-2 rounded-full w-full mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}