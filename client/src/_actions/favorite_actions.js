import axios from 'axios';
import {FAVORITE_SERVER} from '../components/Config';
import {FAVORITE_NUMBER, FAVORITED} from './types';

export function favoriteNumber(dataToSubmit){
    // 서버로부터 받은 데이터를 request에 저장
    const request = axios.post(`${FAVORITE_SERVER}/favoriteNumber`, dataToSubmit) 
        .then(response => {
            //console.log(response.data);
            return response.data
        });

    // reducer에 넘겨준다.
    return {
        type: FAVORITE_NUMBER,
        payload: request
    }
}

export function favorited(dataToSubmit){
    // 서버로부터 받은 데이터를 request에 저장
    const request = axios.post(`${FAVORITE_SERVER}/favorited`, dataToSubmit) 
        .then(response => {
            console.log(response.data);
            return response.data
        });

    // reducer에 넘겨준다.
    return {
        type: FAVORITED,
        payload: request
    }
}