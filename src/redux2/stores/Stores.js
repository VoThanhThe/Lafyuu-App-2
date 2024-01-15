import {createStore} from 'redux';
import {Reducers} from '../reducers/Reducers';
import {ReducersWishlist} from '../reducers/ReducersWishList';
import {UserReducer} from '../reducers/UserReducer';
import { combineReducers } from 'redux';

const routeReducer = combineReducers({Reducers, ReducersWishlist, UserReducer});
export const store = createStore(routeReducer);
