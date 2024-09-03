import React, { useEffect, useState } from "react";
import { useGameContext } from "../../context";
import './PlayerInfo.scss';

export default function PlayerInfo({ name }: { name: string | null }) {
    const { round } = useGameContext();
    const [currentTime, setCurrentTime] = useState('')
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [round.started]);

    return (
        <div className="player-info">
            <div className="item">
                <img src='/icons/badge-award-medal_svgrepo.com.svg' />
                <span>{round.points || ''}</span>
            </div>
            <div className="item">
                <img src='/icons/men-gear_svgrepo.com.svg' />
                <span>{name}</span>
            </div>
            <div className="item">
                <img src='/icons/clock_svgrepo.com.svg' />
                <span>{round.started ? currentTime : ''}</span>
            </div>
        </div>
    )
}