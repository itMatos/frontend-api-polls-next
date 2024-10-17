import axios from 'axios';
import config from './config';

export const BeuniPollsApiClient = axios.create({
    baseURL: config.pollsApi,
});
