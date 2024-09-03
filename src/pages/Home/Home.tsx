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

export default function Home() {
    const { generateAutoPlayers, scheduleAutoPlayerMessages } = useGameContext();
    const [newRound, setNewRound] = useState(false)
    useEffect(() => {
        generateAutoPlayers();
        scheduleAutoPlayerMessages();
    }, []);
    const [playerName, setPlayerName] = useState<string | null>(null);

    const handleAcceptPlayerName = (name: string) => {
        setPlayerName(name);
        setNewRound(true);
    };

    return (
        <div className="home">
            <div className="player-controls">
                <div className="pl-inputs">
                    {newRound ?
                        <>
                            <PlayerInputs />
                            <CurrentRound />
                            <SpeedSlider />
                        </> :
                        <Welcome onAccept={handleAcceptPlayerName} />
                    }

                </div>
                <div className="pl-info">
                    <PlayerInfo name={playerName}/>
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