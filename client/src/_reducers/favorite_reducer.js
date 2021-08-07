import {FAVORITE_NUMBER, FAVORITED} from '../_actions/types';

export default function favoriteReducer(previousState = {}, action){
    switch(action.type){
        case FAVORITE_NUMBER:
            return {...previousState, favoriteNumber: action.payload};

        case FAVORITED:
            return {...previousState, favorited: action.payload};
                  
        default:
            return previousState;
            
    }
}