import {CARS_UPDATE, CLEAR_CARS, DELETE_CARS, SET_CARS_STALE, SWITCH_SHOW_CARS} from '../actions/carActions';
import {
    clearElements,
    deleteElements,
    elementsUpdate,
    setElementsStale,
    switchShowElements
} from './elementsBaseReducer';

export const initialState = {
    showElements: false,
    elements: {},
    elementIds: []
};

export function carsReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_SHOW_CARS: {
            return switchShowElements(state, action);
        }
        case CARS_UPDATE: {
            return elementsUpdate(state, action);
        }
        case SET_CARS_STALE: {
            return setElementsStale(state, action);
        }
        case DELETE_CARS: {
            return deleteElements(state, action);
        }
        case CLEAR_CARS: {
            return clearElements(state);
        }
        default:
            return state;
    }
}
