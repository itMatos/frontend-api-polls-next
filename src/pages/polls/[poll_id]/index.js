import * as React from 'react';
import PollMaker from '../CreateNewPoll';
import { useRouter } from 'next/router';

export default function EditPoll() {
    const router = useRouter();
    const { poll_id } = router.query;
    return <PollMaker isEditing={true} pollIdToEdit={poll_id} />;
}
