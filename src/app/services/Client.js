import axios from 'axios';
import config from './config';

export const SurveyProPollsApiClient = axios.create({
    baseURL: config.pollsApi,
});
