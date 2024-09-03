import React, { createContext, useState, ReactNode, useContext, useEffect, useMemo, useCallback } from 'react';
import { useWebSocket } from '../hooks';
import { stat } from 'fs';

export interface Player {
    name: string;
    pointsPlaced: number;
    predictedMultiplier: number;
    won: boolean;
    score: number;
    isAutoPlayer?: boolean;
    color?: { sender: string, message: string };
}

interface ChatMessage {
    sender: string;
    message: string;
}

interface GameRound {
    points: number;
    multiplier: number;
    multiplierHistory: number[];
    players: Player[];
    chatMessages: { sender: string; message: string }[];
    speed: number;
    isRunning: boolean;
    autoPlayersGenerated: boolean,
    started: boolean,
    stop: number,
    isStoped: boolean
}

interface GameContextProps {
    round: GameRound;
    setPoints: (points: number) => void;
    setMultiplier: (multiplier: number | ((prevMultiplier: number) => number)) => void;
    setPlayers: (players: Player[] | ((prevPlayers: Player[]) => Player[])) => void;
    addPlayer: (player: Player) => void;
    setChatMessages: (messages: { sender: string; message: string }[]) => void;
    setSpeed: (speed: number) => void;
    startGame: () => void;
    stopGame: () => void;
    generateAutoPlayers: () => void;
    scheduleAutoPlayerMessages: () => void;
    newGame: () => void;
    setStop: (points: number) => void;
}

const initialState: GameRound = {
    points: 0,
    multiplier: 0,
    multiplierHistory: [0],
    players: [],
    chatMessages: [],
    speed: 1,
    isRunning: false,
    autoPlayersGenerated: false,
    started: false,
    stop: 0.1,
    isStoped: false,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GameRound>(initialState);
    const { sendMessage } = useWebSocket('ws://localhost:3001');
    console.log("GameProvider rendered");
    useEffect(() => {
        console.log("isStoped changed:", state.isStoped);
    }, [state.isStoped]);

    const setPoints = useCallback((points: number) => {
        setState((prevState) => ({ ...prevState, points }));
    }, []);

    const setMultiplier = useCallback((multiplier: number | ((prevMultiplier: number) => number)) => {
        setState((prevState) => {
            const newMultiplier = typeof multiplier === 'function' ? multiplier(prevState.multiplier) : multiplier;

            return {
                ...prevState,
                multiplier: newMultiplier,
                multiplierHistory: [...prevState.multiplierHistory, newMultiplier]

            };
        });
    }, []);

    const setPlayers = useCallback((players: Player[] | ((prevPlayers: Player[]) => Player[])) => {
        setState((prevState) => ({
            ...prevState,
            players: typeof players === 'function' ? players(prevState.players) : players,

        }));
    }, []);

    const addPlayer = useCallback((player: Player) => {
        setState((prevState) => ({
            ...prevState,
            players: [...prevState.players, player],
        }));
    }, []);

    const setSpeed = useCallback((speed: number) => {
        setState((prevState) => ({ ...prevState, speed }));
    }, []);

    const setChatMessages = useCallback((messages: ChatMessage[]) => {
        setState((prevState) => ({ ...prevState, chatMessages: messages }));
    }, []);


    const generateAutoPlayers = useCallback(() => {
        if (state.autoPlayersGenerated) return;

        const autoPlayerNames = ['CPU 1', 'CPU 2', 'CPU 3', 'CPU 4'];
        const autoPlayerColors = [{ sender: '#FF5733', message: '#707783' }, { sender: '#33FF57', message: '#696B6E' }, { sender: '#3357FF', message: '#464A52' }, { sender: '#F33FF5', message: '#1F252C' }];
        const autoPlayers = autoPlayerNames.map((name, index) => ({
            name,
            pointsPlaced: Math.floor(Math.random() * 100) + 1,
            predictedMultiplier: parseFloat((Math.random() * 10).toFixed(2)),
            won: false,
            score: 0,
            isAutoPlayer: true,
            color: autoPlayerColors[index],
        }));

        setPlayers([...state.players, ...autoPlayers]);

        setState((prevState) => ({
            ...prevState,
            autoPlayersGenerated: true,
        }));
    }, []);

    const startGame = useCallback(() => {
        setState((prevState) => ({ ...prevState, isRunning: true, isStoped: false }));

    }, []);

    const stopGame = useCallback(() => {
        setState((prevState) => {
            console.log("Before stopGame:", prevState);
            return {
                ...prevState,
                isStoped: true,
                isRunning: false,

            };
        });
        console.log("aftr stopGame:", state);
        setTimeout(() => setState((prevState) => ({ ...prevState })), 0);
    }, []);

    const newGame = useCallback(() => {
        setState((prevState) => ({ ...prevState, started: true }));
    }, []);

    const setStop = useCallback((stop: number) => {
        setState((prevState) => ({ ...prevState, stop }));
    }, []);

    const sendAutoPlayerMessage = useCallback((autoPlayerName: string) => {
        const autoPlayerMessages = [
            "I'm going to win this round!",
            "I feel lucky!",
            "Let’s see what happens!",
            "Good luck everyone!",
            "This game is intense!",
            "Hi everyone",
        ];

        const randomMessage = autoPlayerMessages[Math.floor(Math.random() * autoPlayerMessages.length)];

        sendMessage({ sender: autoPlayerName, message: randomMessage });
    }, []);

    const scheduleAutoPlayerMessages = useCallback(() => {
        state.players
            .filter((player) => player.isAutoPlayer)
            .forEach((autoPlayer) => {
                const randomInterval = Math.random() * (10000 - 2500) + 2500;

                setTimeout(() => {
                    sendAutoPlayerMessage(autoPlayer.name);
                }, randomInterval);
            });
    }, []);

    const value = useMemo(() => ({
        round: state,
        setPoints,
        setMultiplier,
        setPlayers,
        addPlayer,
        setChatMessages,
        setSpeed,
        startGame,
        stopGame,
        newGame,
        setStop,
        generateAutoPlayers,
        scheduleAutoPlayerMessages
    }), [state]);
    return (
        <GameContext.Provider value={value}>
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
