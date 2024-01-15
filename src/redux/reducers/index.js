import {combineReducers} from 'redux';
import info from './infoReducer';
import products from './productReducer';

const reducers = combineReducers({
    personalInfo: info,
    personalProduct: products
});

export default (state, action) => reducers(state, action);