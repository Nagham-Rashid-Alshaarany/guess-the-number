import React, { useState } from 'react';
import { Input, Button, Typography } from 'antd';
import './Welcome.scss';

const { Title, Text } = Typography;

interface WelcomeScreenProps {
  onAccept: (playerName: string) => void;
}

export default function Welcome({ onAccept }: WelcomeScreenProps){
  const [playerName, setPlayerName] = useState<string>('');

  const handleAccept = () => {
    if (playerName.trim()) {
      onAccept(playerName);
    }
  };

  return (
    <div className="welcome-screen">
      <Title level={2} className="welcome-title">
        Welcome
      </Title>
      <Text className="welcome-text">
        Please Insert Your Name
      </Text>
      <Input
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Your Name"
        className="name-input"
        size="large"
      />
      <Button
        type="primary"
        onClick={handleAccept}
        className="accept-button"
        size="large"
        disabled={playerName.length<3}
      >
        Accept
      </Button>
    </div>
  );
};
