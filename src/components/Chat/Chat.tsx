import React, { useState } from 'react';
import { List, Input, Button } from 'antd';
import './Chat.scss';
import { useWebSocket } from '../../hooks';
import { useGameContext } from '../../context';

export default function Chat() {
  const { messages, sendMessage } = useWebSocket('ws://localhost:3001');
  const [newMessage, setNewMessage] = useState<string>('');
  const { round } = useGameContext();
  const players = round.players;

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

  const getPlayerColor = (sender: string) => {
    const player = players.find(p => p.name === sender);
    return player?.color ? player.color : { sender: '#F54D5E', message: '#202632' };
  };

  return (
    <div className="chat">
      <div className='label'>
        <img src={"/icons/chat_svgrepo.com.svg"} />
        <label>Chat</label>
      </div>
      <div className='msg-container'>
        <List
          className="chat-messages"
          dataSource={messages}
          renderItem={(item, index) => (
            <List.Item className="chat-message-item" key={index}>
              <strong className="chat-sender" style={{ color: getPlayerColor(item.sender)?.sender }} >
                {typeof item.sender === 'string' ? item.sender : 'Unknown'}

              </strong>
              <div className="chat-message" style={{ backgroundColor: getPlayerColor(item.sender)?.message }}>
                {typeof item.message === 'string' ? item.message : '[Invalid message]'}
              </div>
            </List.Item>
          )}
          locale={{ emptyText: null }}
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

    </div>
  );
};

