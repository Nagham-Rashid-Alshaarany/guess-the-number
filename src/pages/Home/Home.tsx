import React, { useEffect } from "react";
import PlayerInputs from "../../components/PlayerInputs";
import GameBoard from "../../components/GameBoard";
import SpeedSlider from "../../components/SpeedSlider";
import CurrentRound from "../../components/CurrentRound";
import Ranking from "../../components/Ranking";
import Chat from "../../components/Chat";
import { useGameContext } from "../../context";
import './Home.scss'
import PlayerInfo from "../../components/PlayerInfo";

export default function Home() {
    const { generateAutoPlayers, scheduleAutoPlayerMessages } = useGameContext();

    useEffect(() => {
        generateAutoPlayers();
        scheduleAutoPlayerMessages();
    }, []);

    return (
        <div className="home">
            <div className="player-controls">
                <div className="pl-inputs">
                    <PlayerInputs />
                    <CurrentRound />
                    <SpeedSlider />
                </div>
                <div className="pl-info">
                    <PlayerInfo/>
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