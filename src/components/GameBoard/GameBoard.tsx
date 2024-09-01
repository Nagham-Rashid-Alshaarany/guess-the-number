// src/components/GameBoard/GameBoard.tsx

import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useGameContext } from '../../context';
import './GameBoard.scss';

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
            }, 20);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning, speed, setMultiplier, stopGame]);

    // Sample data - this should ideally reflect real-time data from the game
    const data = {
        labels: Array.from({ length: multiplierHistory.length }, (_, i) => i + 1),
        datasets: [
            {
                label: 'Multiplier',
                data: multiplierHistory.map(m => ({ x: 0, y: Math.exp(2 * m) })),
                borderColor: '#ff4d4f',
                borderWidth: 3,
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 0,
            },
        ],
    };

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
        <div className="game-board">
            <Line data={data} options={options} />
        </div>
    );
};

