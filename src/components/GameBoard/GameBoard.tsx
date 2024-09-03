import React, { useEffect } from 'react';
import { useGameContext } from '../../context';
import './GameBoard.scss';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, DotProps } from 'recharts';

interface CustomDotProps extends DotProps {
    index: number;
    dataLength: number;
}

const CustomDot = ({ cx, cy, index, dataLength }: CustomDotProps) => {
    const isLastPoint = index === dataLength - 1;

    if (!isLastPoint) {
        return null;
    }

    return (
        <circle cx={cx} cy={cy} r={10} fill="#ffc107" />
    );
};

export default function GameBoard() {
    const { round, setMultiplier, stopGame } = useGameContext();
    const { multiplier, multiplierHistory, speed, isRunning } = round;

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setMultiplier((prevMultiplier) => {
                    const newMultiplier = parseFloat((prevMultiplier + 0.01 * speed).toFixed(2));
                    if (newMultiplier >= 10) {
                        stopGame();
                        return newMultiplier;
                    }
                    return newMultiplier;
                });
            }, speed);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, speed, setMultiplier, stopGame]);

    const normalizedData = multiplierHistory.map((m) => ({
        x: m,
        y: Math.pow(2, m),
    }));

    return (
        <div className="game-board">
            <div className='x-value' >
                {multiplier.toFixed(2)}x
            </div>
            <ResponsiveContainer width="100%" height={500}>

                <LineChart
                    data={normalizedData}
                    margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                >
                    <XAxis
                        dataKey="x"
                        type="number"
                        domain={[0, 10]}
                        tickCount={11}
                        ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        tick={{ fill: '#707783' }}
                        allowDataOverflow={false}
                    />
                    <YAxis
                        hide={true}
                        type="number"
                        domain={[0, 1100]}
                        allowDataOverflow={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="y"
                        stroke="#F54D5E"
                        strokeWidth={4}
                        dot={({ cx, cy, index }) => (
                            <CustomDot cx={cx} cy={cy} index={index} dataLength={normalizedData.length} />
                        )}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}
