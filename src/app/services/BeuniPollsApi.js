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
