import React, { useState } from 'react';
import { List, Input, Button } from 'antd';
import './Chat.scss';
import { useWebSocket } from '../../hooks';

export default function Chat(){
  const { messages, sendMessage } = useWebSocket('ws://localhost:3001');
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage = {
        sender: 'You', 
        message: newMessage,
      };

      sendMessage(newChatMessage);
      setNewMessage(''); 
    }
  };

  return (
    <div className="chat">
      <List
        className="chat-messages"
        dataSource={messages}
        renderItem={(item) => (
          <List.Item className="chat-message-item">
            <strong className="chat-sender">
              {typeof item.sender === 'string' ? item.sender : 'Unknown'}
            </strong>
            <div className="chat-message">
              {typeof item.message === 'string' ? item.message : '[Invalid message]'}
            </div>
          </List.Item>
        )}
        locale={{ emptyText: null }} // Hide default empty text
      />
      <div className="chat-input-area">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Type a message..."
          className="chat-input"
        />
        <Button type="primary" onClick={handleSendMessage} className="chat-send-button">
          Send
        </Button>
      </div>
    </div>
  );
};

