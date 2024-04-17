import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useChatBot } from '../context/ChatBotProvider';

function ChatInput() {
  const [message, setMesage] = useState({ from: 'human', msg: '' });

  const { sendMessageHandler } = useChatBot();

  const handleChange = (e) => {
    const msg = e.target.value;
    setMesage({ from: 'human', msg, className: 'my-2 ms-auto' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMesage({ from: 'human', msg: '' });
      await sendMessageHandler(message);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className='my-2'>
        <Col sm={10}>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='votre message ici'
              name='msg'
              value={message.msg}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Button
            variant='primary'
            type='submit'>
            Envoyer
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ChatInput;
