import { BeuniPollsApiClient } from './Client';

export async function getPolls() {
    const response = await BeuniPollsApiClient.get('/polls');
    return response.data;
}

export async function createPoll(payloadPoll) {
    const response = await BeuniPollsApiClient.post('/polls', payloadPoll);
    return response;
}
