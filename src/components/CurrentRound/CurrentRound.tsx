import React from 'react';
import { Table } from 'antd';
import { useGameContext } from '../../context';
import './CurrentRound.scss';

export default function CurrentRound(){
    const { round } = useGameContext();
    const { players } = round;

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (
                <strong className={round.isStoped ? (record.won ? 'won' : 'lost') : ''}>
                    {text}
                </strong>
            ),
        },
        {
            title: 'Point',
            dataIndex: 'pointsPlaced',
            key: 'pointsPlaced',
            render: (text: number, record: any) => (
                <span className={round.isStoped ? (record.won ? 'won' : 'lost') : ''}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Multiplier',
            dataIndex: 'predictedMultiplier',
            key: 'predictedMultiplier',
            render: (text: number, record: any) => (
                <span className={round.isStoped? (record.won ? 'won' : 'lost') : ''}>
                    {text.toFixed(2)}
                </span>
            ),
        },
    ];

    return (
        <div className="current-round">
            <div className='label'>
                <img src={"/icons/cup_svgrepo.com.svg"} />
                <label>Current Round</label>
            </div>
            <Table
                columns={columns}
                dataSource={players}
                rowKey="name"
                pagination={false}
                bordered
                className="current-round-table"
            />
        </div>
    );
};