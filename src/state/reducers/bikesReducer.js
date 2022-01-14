import {BIKES_UPDATE, CLEAR_BIKES, DELETE_BIKES, SET_BIKES_STALE, SWITCH_SHOW_BIKES} from '../actions/bikeActions';
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

export function bikesReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_SHOW_BIKES: {
            return switchShowElements(state, action);
        }
        case BIKES_UPDATE: {
            return elementsUpdate(state, action);
        }
        case SET_BIKES_STALE: {
            return setElementsStale(state, action);
        }
        case DELETE_BIKES: {
            return deleteElements(state, action);
        }
        case CLEAR_BIKES: {
            return clearElements(state);
        }
        default:
            return state;
    }
}
