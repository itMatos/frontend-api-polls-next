import { BeuniPollsApiClient } from './Client';

export async function getPolls() {
    const response = await BeuniPollsApiClient.get('/polls');
    return response.data;
}

export async function createPoll(payloadPoll) {
    const response = await BeuniPollsApiClient.post('/polls', payloadPoll);
    return response;
}
export async function deletePoll(pollId) {
    const response = await BeuniPollsApiClient.delete(`/polls/${pollId}`);
    return response;
}

export async function getPollById(pollId) {
    const response = await BeuniPollsApiClient.get(`/polls/${pollId}`);
    return response.data;
}

export async function updatePoll(pollId, payloadPoll) {
    const response = await BeuniPollsApiClient.patch(
        `/polls/${pollId}`,
        payloadPoll,
    );
    return response;
}

export async function votePoll(payloadVote) {
    const response = await BeuniPollsApiClient.post('/votes', payloadVote);
    return response;
}

export async function getUserVotedPolls(userId) {
    const response = await BeuniPollsApiClient.get(
        `/votes/user-voted-polls/${userId}`,
    );
    return response.data;
}

export async function getUserInfoByEmail(email) {
    const response = await BeuniPollsApiClient.get(`/users/email/${email}`);
    return response.data;
}

export async function createUser(payload) {
    const response = await BeuniPollsApiClient.post('/users', payload);
    return response;
}
