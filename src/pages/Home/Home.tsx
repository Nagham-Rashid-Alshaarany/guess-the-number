import React from "react";
import PlayerInputs from "../../components/PlayerInputs";
import GameBoard from "../../components/GameBoard";
import SpeedSlider from "../../components/SpeedSlider";

export default function Home() {
    return (
        <>
            <PlayerInputs />
            <SpeedSlider/>
            <GameBoard />
        </>
    )
}