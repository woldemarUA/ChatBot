import React, { createContext, useContext, useState, useEffect } from 'react';

import { sendMessage } from '../actions/botMessaging';

const ChatBotContext = createContext();

export const useChatBot = () => useContext(ChatBotContext);

export const ChatBotProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    // { from: 'human', msg: 'What is scrimba', className: 'p-2 ms-auto' },
    // {
    //   from: 'ai',
    //   msg: 'Scrimba is an online platform for learning to code. You can interact with teachers, code reviewers, and professional developers to get help and support with your coding journey. It offers live sessions, a Discord server for community interaction, and a lightweight platform that can be used on low-spec PCs and mobile internet. If you have any questions, you can reach out to them on Discord or email them at help@scrimba.com.',
    // },
  ]);

  const sendMessageHandler = async (message) => {
    setMessages((previousState) => [...previousState, message]);
    try {
      const reply = await sendMessage(message);
      setMessages((previousState) => [
        ...previousState,
        { ...reply, className: 'my-2' },
      ]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <ChatBotContext.Provider value={{ messages, sendMessageHandler }}>
      {children}
    </ChatBotContext.Provider>
  );
};
