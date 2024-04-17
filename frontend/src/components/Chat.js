import React from 'react';
import Container from 'react-bootstrap/Container';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { useChatBot } from '../context/ChatBotProvider';
export default function Chat() {
  const { messages } = useChatBot();
  return (
    <Container
      className='my-3'
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'flex-start',
      //   height: '50vh',
      //   overflowY: 'scroll',
      // }}
    >
      <div className='container'>
        {messages.map((message, index) => {
          return (
            <ChatMessage
              key={index}
              message={message}
            />
          );
        })}
        <ChatInput />
      </div>
    </Container>
  );
}
