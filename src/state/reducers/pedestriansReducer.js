import {
    CLEAR_PEDESTRIANS,
    DELETE_PEDESTRIANS,
    PEDESTRIANS_UPDATE,
    SET_PEDESTRIANS_STALE,
    SWITCH_SHOW_PEDESTRIANS
} from '../actions/pedestrianActions';
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

export function pedestriansReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_SHOW_PEDESTRIANS: {
            return switchShowElements(state, action);
        }
        case PEDESTRIANS_UPDATE: {
            return elementsUpdate(state, action);
        }
        case SET_PEDESTRIANS_STALE: {
            return setElementsStale(state, action);
        }
        case DELETE_PEDESTRIANS: {
            return deleteElements(state, action);
        }
        case CLEAR_PEDESTRIANS: {
            return clearElements(state);
        }
        default:
            return state;
    }
}
