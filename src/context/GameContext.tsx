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
    players: Player[];
    speed: number;
}

interface GameContextProps {
    round: GameRound;
    setPoints: (points: number) => void;
    setMultiplier: (multiplier: number) => void;
    setPlayers: (players: Player[]) => void;
    setSpeed: (speed: number) => void;
}

const initialState: GameRound = {
    points: 100,
    multiplier: 1,
    players: [],
    speed: 1,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameRound>(initialState);

    const setPoints = (points: number) => {
        setState((prevState) => ({ ...prevState, points }));
    };

    const setMultiplier = (multiplier: number) => {
        setState((prevState) => ({ ...prevState, multiplier }));
    };

    const setPlayers = (players: Player[]) => {
        setState((prevState) => ({ ...prevState, players }));
    };

    const setSpeed = (speed: number) => {
        setState((prevState) => ({ ...prevState, speed }));
    };

    return (
        <GameContext.Provider value={{ round: state, setPoints, setMultiplier, setPlayers, setSpeed }}>
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
