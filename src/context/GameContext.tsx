import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Player {
    name: string;
    pointsPlaced: number;
    predictedMultiplier: number;
    won: boolean;
    score: number;
}

interface GameRound {
    points: number;
    multiplier: number;
    multiplierHistory: number[];
    players: Player[];
    speed: number;
    isRunning: boolean,
}

interface GameContextProps {
    round: GameRound;
    setPoints: (points: number) => void;
    setMultiplier: (multiplier: number | ((prevMultiplier: number) => number)) => void;
    setPlayers: (players: Player[]) => void;
    setSpeed: (speed: number) => void;
    startGame: () => void;
    stopGame: () => void;
}

const initialState: GameRound = {
    points: 100,
    multiplier: 0,
    multiplierHistory: [0],
    players: [],
    speed: 1,
    isRunning: false,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameRound>(initialState);

    const setPoints = (points: number) => {
        setState((prevState) => ({ ...prevState, points }));
    };

    const setMultiplier = (multiplier: number | ((prevMultiplier: number) => number)) => {
        setState((prevState) => {
            const newMultiplier = typeof multiplier === 'function' ? multiplier(prevState.multiplier) : multiplier;

            return {
                ...prevState,
                multiplier: newMultiplier,
                multiplierHistory: [...prevState.multiplierHistory, newMultiplier]

            };
        });
    };

    const setPlayers = (players: Player[]) => {
        setState((prevState) => ({ ...prevState, players }));
    };

    const setSpeed = (speed: number) => {
        setState((prevState) => ({ ...prevState, speed }));
    };
    const startGame = () => {
        setState((prevState) => ({ ...prevState, isRunning: true }));
    };

    const stopGame = () => {
        setState((prevState) => ({ ...prevState, isRunning: false }));
    };

    return (
        <GameContext.Provider
            value={{ round: state, setPoints, setMultiplier, setPlayers, setSpeed, startGame, stopGame }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
