import React from 'react';
import { Slider } from 'antd';
import { useGameContext } from '../../context';
import './SpeedSlider.scss';

const SpeedSlider: React.FC = () => {
    const { round, setSpeed } = useGameContext();

    const handleSpeedChange = (value: number) => {
        setSpeed(value);
    };

    return (
        <div className="speed-slider">
            <div className='label'>
                <img src={"/icons/racing-speed_svgrepo.com.svg"}/>
                <label>Speed: {round.speed}x</label>
            </div>
            <Slider
                min={1}
                max={5}
                step={1}
                value={round.speed}
                onChange={handleSpeedChange}
                marks={{
                    1: '1x',
                    2: '2x',
                    3: '3x',
                    4: '4x',
                    5: '5x',
                }}

            />
        </div>
    );
};

export default SpeedSlider;
