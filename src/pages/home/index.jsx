'use client';
import React from 'react';
import HomePage from './HomePage';
import NewPoll from './FirstCard';
import ListPolls from './ListPolls';

export default function Home() {
    return (
        <>
            <HomePage />
            <NewPoll />
            <ListPolls />
        </>
    );
}
