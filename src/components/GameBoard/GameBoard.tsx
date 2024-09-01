// src/components/GameBoard/GameBoard.tsx

import React, { useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useGameContext } from '../../context';
import './GameBoard.scss';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, DotProps } from 'recharts';


// Register all necessary components from Chart.js
Chart.register(...registerables);


export default function GameBoard() {
    const { round, setMultiplier, stopGame } = useGameContext();
    const { multiplier, multiplierHistory, speed, isRunning } = round;

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {

            interval = setInterval(() => {
                setMultiplier((prevMultiplier) => {
                    const newMultiplier = parseFloat((prevMultiplier + 0.01).toFixed(2));
                    if (newMultiplier >= 10) {
                        stopGame();
                        return newMultiplier;
                    }

                    return newMultiplier;
                });
            }, 0.5);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, speed, setMultiplier, stopGame]);

    // Sample data - this should ideally reflect real-time data from the game
    // const data = {
    //     labels: Array.from({ length: multiplierHistory.length }, (_, i) => i + 1),
    //     datasets: [
    //         {
    //             label: 'Multiplier',
    //             data: multiplierHistory.map(m => ({ x: 0, y: Math.pow(1.252, m) })),
    //             borderColor: '#ff4d4f',
    //             borderWidth: 3,
    //             fill: false,
    //             pointRadius: 0,
    //             pointHoverRadius: 0,
    //         },
    //     ],
    // };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    color: '#fff',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            x: {
                begainAtZero: true,
                ticks: {
                    color: '#fff',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={multiplierHistory.map(m => ({ x: m, y: Math.pow(2, m) }))} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis
                dataKey="x"
                ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                tick={{ fill: '#999' }}
                domain={[1, 10]}
              />
              <YAxis hide={true} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#ff4d4d"
                strokeWidth={4}
                dot={(dotProps) => {
                  const isLastPoint = dotProps.index === multiplierHistory.length - 1;
                  return isLastPoint ? (
                    <circle cx={dotProps.cx} cy={dotProps.cy} r={8} fill="#ffc107" />
                  ) : null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ textAlign: 'center', color: '#ff4d4d', fontSize: '48px', marginTop: '-50px' }}>
22          </div>
        </div>
      );
};

