'use client';
import React from 'react';
import PollMaker from './CreateNewPoll';
import { useRouter } from 'next/router';

export default function Polls({
    userId,
    name,
    isEditing = false,
    pollId = null,
}) {
    const router = useRouter();
    return (
        <PollMaker
            userId={userId || router?.query?.userId}
            name={name || router?.query?.name}
            isEditing={isEditing}
            pollIdToEdit={pollId}
        />
    );
}
