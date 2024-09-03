import React, { useState } from 'react';
import { InputNumber, Button } from 'antd';
import { useGameContext } from '../../context';

import './PlayerInputs.scss';
import { Player } from '../../context/GameContext';

export default function PlayerInputs() {
  const { round, setPoints, setMultiplier, startGame, setPlayers } = useGameContext();
  const [points, setLocalPoints] = useState<number>(0);
  const [predictedMultiplier, setPredictedMultiplier] = useState<number>(1.0);

  const handleBet = () => {

    setPoints(round.points - points);
    startGame();
    updatePlayer('pointsPlaced', points);
    updatePlayer('predictedMultiplier', predictedMultiplier);

  };

  const updatePlayer = (fieldName: string, value: number) => {
    setPlayers((prevPlayers: Player[]) =>
      prevPlayers.map((player) =>
        player.name === 'You'
          ? { ...player, [fieldName]: value }
          : player
      )
    );
  };

  const onPointsIncrement = () => {
    setLocalPoints((value) => Math.min(value + 1, round.points))
  };

  const onPointsDecrement = () => {
    setLocalPoints((value) => Math.max(value - 1, 0))
  };
  const onMultiplierIncrement = () => {
    setPredictedMultiplier((value) => Math.min(value + 0.25, round.points))
  };

  const onMultiplierDecrement = () => {
    setPredictedMultiplier((value) => Math.max(value - 0.25, 0))
  };
  return (
    <div className="player-inputs">
      <div className='inputs'>
        <div className='custom-input-number'>
          <div className="label">Points</div>
          <div className='input-number'>
            <img src={"/icons/arrow-dawn.svg"} onClick={onPointsDecrement} />
            <InputNumber
              min={1}
              step={1}
              max={round.points}
              value={points}
              onChange={(value) => setLocalPoints(value ?? 0)}
              controls={false}
            />
            <img src={"/icons/arrow-up.svg"} onClick={onPointsIncrement} />
          </div>
        </div>

        <div className='custom-input-number'>
          <div className="label">Multiplier</div>
          <div className='input-number'>
            <img src={"/icons/arrow-dawn.svg"} onClick={onMultiplierDecrement} />
            <InputNumber
              min={0}
              step={0.25}
              max={10}
              value={predictedMultiplier}
              onChange={(value) => setPredictedMultiplier(value ?? 0)}
              controls={false}
            />
            <img src={"/icons/arrow-up.svg"} onClick={onMultiplierIncrement} />
          </div>
        </div>
      </div>
      <Button type="primary" onClick={handleBet} disabled={round.isRunning} >
        {round.isRunning ? "Started" : "Start"}
      </Button>
    </div>
  );
};

