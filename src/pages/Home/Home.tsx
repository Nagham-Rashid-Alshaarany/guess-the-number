import React, { useEffect, useState } from "react";
import PlayerInputs from "../../components/PlayerInputs";
import GameBoard from "../../components/GameBoard";
import SpeedSlider from "../../components/SpeedSlider";
import CurrentRound from "../../components/CurrentRound";
import Ranking from "../../components/Ranking";
import Chat from "../../components/Chat";
import { useGameContext } from "../../context";
import './Home.scss'
import PlayerInfo from "../../components/PlayerInfo";
import Welcome from "../../components/Welcome";
import { generateRandomMultiplier } from "../../utils";

export default function Home() {
    const {
        generateAutoPlayers,
        scheduleAutoPlayerMessages,
        newGame, round, setPoints,
        setStop, setPlayers
    } = useGameContext();
    const [playerName, setPlayerName] = useState<string | null>(null);
    useEffect(() => {
        generateAutoPlayers();
    }, []);


    const handleAcceptPlayerName = (name: string) => {
        setPlayerName(name);
        newGame();
        setPoints(1000);
        setStop(generateRandomMultiplier())
        const newPlayer = {
            name: 'You',
            pointsPlaced: 1,
            predictedMultiplier: 0.01,
            won: false,
            score: 0,
        };
        setPlayers([newPlayer, ...round.players]);
        scheduleAutoPlayerMessages();
    };

    return (
        <div className="home">
            <div className="player-controls">
                <div className="pl-inputs">
                    {round.started ?
                        <>
                            <PlayerInputs />
                            <CurrentRound />
                            <SpeedSlider />
                        </> :
                        <Welcome onAccept={handleAcceptPlayerName} />
                    }

                </div>
                <div className="pl-info">
                    <PlayerInfo name={playerName} />
                    <GameBoard />
                </div>
            </div>
            <div className="results">
                <Ranking />
                <Chat />
            </div>


        </div>
    )
}