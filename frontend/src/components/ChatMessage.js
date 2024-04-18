import React from 'react';

const ChatMessage = ({ message }) => {
  if (message.from === 'ai') {
    return (
      <div className='row'>
        <div className='col-8'>
          <p className='bg-secondary text-light rounded p-2'>{message.msg}</p>
        </div>
        <div className='col-4'></div>
      </div>
    );
  } else {
  }
  return (
    <div className='row'>
      <div className='col-4'></div>
      <div className='col-8'>
        <p className='bg-primary text-light rounded p-2'>{message.msg}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
