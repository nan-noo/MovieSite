import {FAVORITE_USER} from '../_actions/types';

export default function(previousState = {}, action){
    switch(action.type){
        case FAVORITE_USER:
            return {...previousState, favorite: action.payload};
                  
        default:
            return previousState;
            
    }
}