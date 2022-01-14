import {combineReducers} from 'redux';
import * as bike from './bikesReducer';
import * as car from './carsReducer';
import * as pedestrian from './pedestriansReducer';

export const initialState = {
    car: car.initialState,
    bike: bike.initialState,
    pedestrian: pedestrian.initialState,
};

export default combineReducers({
    car: car.carsReducer,
    bike: bike.bikesReducer,
    pedestrian: pedestrian.pedestriansReducer,
});
