import * as React from 'react';
import PollMaker from '../CreateNewPoll';
import { useRouter } from 'next/router';

export default function EditPoll() {
    console.log('EditPoll');
    const router = useRouter();
    const { poll_id } = router.query;
    console.log('poll_id', poll_id);
    return <PollMaker isEditing={true} pollIdToEdit={poll_id} />;
}
