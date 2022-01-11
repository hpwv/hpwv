import {combineReducers} from 'redux';
import * as cars from './carsReducer';

export const initialState = {
    cars: cars.initialState,
};

export default combineReducers({
    cars: cars.carsReducer,
});
