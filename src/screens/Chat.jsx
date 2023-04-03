import React, { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { TypeAnimation } from 'react-type-animation';

function shatGpt() {
  const items = [
    'kas i na',
    'Kādreiz mūžā atbildēs ar?',
    '🤣🤣🤣',
    'tu dzērs i?',
    '🤣🤣🤣',
    '9gag šitas bi',
    '🤣🤣🤣',
    'https://9gag.com/gag/amAGYMy',
    'Mr flex',
    'bļē',
    '🤣🤣🤣',
    'Mega Chad',
    '🤣🤣🤣',
    'Pārnolicies',
    '🤣🤣🤣',
    'And?',
    '🧠',
  ];

  return items[Math.floor(Math.random() * items.length)];
}

export const Chat = () => {
  const [bottomPadding, setBottomPadding] = useState(0);

  useEffect(() => {
    const adjustBottomPadding = () => {
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      const paddingBottom = Math.max(vh - window.innerHeight, 0);
      setBottomPadding(paddingBottom);
    };

    window.addEventListener('resize', adjustBottomPadding);
    adjustBottomPadding();

    return () => {
      window.removeEventListener('resize', adjustBottomPadding);
    };
  }, []);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = useCallback(() => {
    if (inputValue === '') return;

    const messageObj = {
      message: inputValue,
      sender: 'user',
    };

    setInputValue('');

    const botMessageObj = {
      message: shatGpt(),
      sender: 'bot',
    };
    setMessages([...messages, messageObj, botMessageObj]);
  }, [setInputValue, setMessages, inputValue, messages]);

  const sendMessageOnEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <div className='h-screen w-full bg-gray-200 flex flex-col justify-end p-4'>
      <Helmet>
        <title>JankGPT</title>
      </Helmet>
      <div className='flex flex-col'>
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-900'
              } rounded-lg p-2 my-2 max-w-xs`}
            >
              <p className='text-sm'>
                {index + 1 === messages.length && message.sender === 'bot' ? (
                  <TypeAnimation
                    sequence={[
                      message.message, // Types 'One'
                      () => {
                        console.log('Sequence completed'); // Place optional callbacks anywhere in the array
                      },
                    ]}
                    wrapper='span'
                    cursor={true}
                    repeat={0}
                  />
                ) : (
                  message.message
                )}
              </p>
            </div>
          );
        })}
      </div>
      <div className='flex mt-4' style={{ paddingBottom: bottomPadding }}>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Ask me anything...'
          onKeyDown={sendMessageOnEnter}
          className='bg-gray-100 p-2 rounded-full w-full mr-2'
        />
        <button
          onClick={sendMessage}
          className='bg-blue-500 text-white px-4 py-2 rounded-full'
        >
          Send
        </button>
      </div>
    </div>
  );
};
