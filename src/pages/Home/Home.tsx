import React from "react";
import PlayerInputs from "../../components/PlayerInputs";
import GameBoard from "../../components/GameBoard";
import SpeedSlider from "../../components/SpeedSlider";
import CurrentRound from "../../components/CurrentRound";

export default function Home() {
    return (
        <>
            <PlayerInputs />
            <CurrentRound/>
            <SpeedSlider/>
            <GameBoard />
        </>
    )
}