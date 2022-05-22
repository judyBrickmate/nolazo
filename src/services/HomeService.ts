import {API} from './api';

export const getEventList = (page:number,size:number = 10) => {
    const url = `events?limit=${size}&page=${page}`
    return API.get(url);
};
