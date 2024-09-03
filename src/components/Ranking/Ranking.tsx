import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGameContext } from '../../context';
import './Ranking.scss';

export default function Ranking() {
    const { round } = useGameContext();
    const { players } = round;
    const [sortedPlayers, setSortedPlayers] = useState([...players]);
    const currentPlayerName = 'You';

    const columns = [
        {
            title: 'No.',
            dataIndex: 'rank',
            key: 'rank',
            render: (_: any, __: any, index: number) => <span>{index + 1}</span>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <strong>{round.isStoped ? text : '-'}</strong>
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            render: (text: number) => <span>{round.isStoped ? text.toFixed(2) : '-'}</span>
        },
    ];
    useEffect(() => {

        setSortedPlayers([...players].sort((a, b) => b.score - a.score));

    }, [round.isStoped, players]);

    console.log(sortedPlayers)

    return (
        <div className="ranking">
            <div className='label'>
                <img src={"/icons/ranking_svgrepo.com.svg"} />
                <label>Ranking</label>
            </div>
            <Table
                columns={columns}
                dataSource={sortedPlayers}
                rowKey="name"
                pagination={false}
                bordered
                className="ranking-table"
                rowClassName={(record) =>
                    record.name === currentPlayerName ? 'current-player-row' : ''
                }
            />
        </div>
    );
};