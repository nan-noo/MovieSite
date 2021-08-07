import axios from 'axios';
import {FAVORITE_SERVER} from '../components/Config';
import {FAVORITE_USER} from './types';

export function favoriteNumber(dataToSubmit){
    // 서버로부터 받은 데이터를 request에 저장
    const request = axios.post(`${FAVORITE_SERVER}/favoriteNumber`, dataToSubmit) 
        .then(response => response.data);

    // reducer에 넘겨준다.
    return {
        type: FAVORITE_USER,
        payload: request
    }
}