import * as React from 'react';
import PollMaker from './CreateNewPoll';

export default function Polls({ pollId }) {
    return <PollMaker isEditing={false} pollIdToEdit={pollId} />;
}
