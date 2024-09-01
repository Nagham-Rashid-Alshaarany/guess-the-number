import React, { useState } from 'react';
import { InputNumber, Button, notification } from 'antd';
import { useGameContext } from '../../context';
import './PlayerInputs.scss';

export default function PlayerInputs() {
  const { round, setPoints, setMultiplier, setPlayers } = useGameContext();
  const [points, setLocalPoints] = useState<number>(0);
  const [predictedMultiplier, setPredictedMultiplier] = useState<number>(1.0);

  const handleBet = () => {
    if (points > round.points) {
      notification.error({
        message: 'Insufficient Points',
        description: 'You do not have enough points to place this bet.',
      });
      return;
    }

    // Update global points
    setPoints(round.points - points);

    // Update players' list
    const newPlayer = {
      name: 'You',
      pointsPlaced: points,
      predictedMultiplier: predictedMultiplier,
      won: false, 
      score: 0,
    };

    setPlayers([...round.players, newPlayer]);

    notification.success({
      message: 'Bet Placed',
      description: `You placed ${points} points on a multiplier of ${predictedMultiplier}x.`,
    });
  };

  return (
    <div className="player-inputs">
      <InputNumber
        min={1}
        max={round.points}
        value={points}
        onChange={(value) => setLocalPoints(value ?? 0)}
        placeholder="Enter points"
        className="input-number"
      />
      <InputNumber
        min={1}
        step={0.01}
        value={predictedMultiplier}
        onChange={(value) => setPredictedMultiplier(value ?? 0)}
        placeholder="Predict multiplier"
        className="input-number"
      />
      <Button type="primary" onClick={handleBet}>
        start
      </Button>
    </div>
  );
};

