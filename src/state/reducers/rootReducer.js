import {combineReducers} from 'redux';
import {WS_CONNECTED, WS_DISCONNECT} from '../actions/webSocketActions';
import * as bike from './bikesReducer';
import * as car from './carsReducer';
import * as pedestrian from './pedestriansReducer';

export const initialState = {
    car: car.initialState,
    bike: bike.initialState,
    pedestrian: pedestrian.initialState,
    connection: {
        connected: false
    }
};

export default combineReducers({
    car: car.carsReducer,
    bike: bike.bikesReducer,
    pedestrian: pedestrian.pedestriansReducer,
    connection: connectionReducer
});


function connectionReducer(state = initialState.connection, action) {
    switch (action.type) {
        case WS_CONNECTED:
            return {
                ...state,
                connected: true
            }
        case WS_DISCONNECT:
            return {
                ...state,
                connected: false
            }
        default:
            return state;
    }
}
