import { SurveyProPollsApiClient } from './Client';

export async function getPolls() {
    const response = await SurveyProPollsApiClient.get('/polls');
    return response.data;
}

export async function createPoll(payloadPoll) {
    const response = await SurveyProPollsApiClient.post('/polls', payloadPoll);
    return response;
}
export async function deletePoll(pollId) {
    const response = await SurveyProPollsApiClient.delete(`/polls/${pollId}`);
    return response;
}

export async function getPollById(pollId) {
    const response = await SurveyProPollsApiClient.get(`/polls/${pollId}`);
    return response.data;
}

export async function updatePoll(pollId, payloadPoll) {
    const response = await SurveyProPollsApiClient.patch(
        `/polls/${pollId}`,
        payloadPoll,
    );
    return response;
}

export async function votePoll(payloadVote) {
    const response = await SurveyProPollsApiClient.post('/votes', payloadVote);
    return response;
}

export async function getUserVotedPolls(userId) {
    const response = await SurveyProPollsApiClient.get(
        `/votes/user-voted-polls/${userId}`,
    );
    return response.data;
}

export async function getUserInfoByEmail(email) {
    const response = await SurveyProPollsApiClient.get(`/users/email/${email}`);
    return response.data;
}

export async function createUser(payload) {
    const response = await SurveyProPollsApiClient.post('/users', payload);
    return response;
}
