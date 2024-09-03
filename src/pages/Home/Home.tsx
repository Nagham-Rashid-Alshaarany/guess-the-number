import React, { useEffect } from "react";
import PlayerInputs from "../../components/PlayerInputs";
import GameBoard from "../../components/GameBoard";
import SpeedSlider from "../../components/SpeedSlider";
import CurrentRound from "../../components/CurrentRound";
import Ranking from "../../components/Ranking";
import Chat from "../../components/Chat";
import { useGameContext } from "../../context";

export default function Home() {
    const { generateAutoPlayers,scheduleAutoPlayerMessages } = useGameContext();

    useEffect(() => {
        generateAutoPlayers();
        scheduleAutoPlayerMessages();
      
    }, []);
    return (
        <>
            <PlayerInputs />
            <CurrentRound/>
            <SpeedSlider/>
            <GameBoard />
            <Ranking/>
            <Chat/>
        </>
    )
}