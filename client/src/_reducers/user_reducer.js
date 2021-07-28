import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types';

export default function(previousState = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...previousState, login: action.payload};
        case REGISTER_USER:
            return {...previousState, register: action.payload};
        case AUTH_USER:
            return {...previousState, userData: action.payload};
        
            
        default:
            return previousState;
            
    }
}