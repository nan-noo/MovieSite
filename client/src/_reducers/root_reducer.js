import {combineReducers} from 'redux';
import user from './user_reducer';
import favorite from './favorite_reducer';

// reducer가 여러 개 있을 수 있기 때문에 root reducer에서 하나로 합쳐줌
const rootReducer = combineReducers({
    user, favorite
});

export default rootReducer;