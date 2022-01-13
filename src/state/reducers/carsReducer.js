import _ from 'lodash';
import {CARS_UPDATE, CLEAR_CARS, DELETE_CARS, SET_CARS_STALE, SWITCH_SHOW_CARS} from '../actions/carActions';

export const initialState = {
    showElements: false,
    elements: {},
    elementIds: []
};

export function carsReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_SHOW_CARS: {
            return {
                ...state,
                showElements: action.value
            }
        }
        case CARS_UPDATE: {
            if (!state.showElements) {
                return {
                    ...state
                }
            }
            const newElements = {...state.elements};
            action.events.forEach(it => {
                newElements[it.element.id] = {
                    ...it.element,
                    timestamp: it.timestamp
                }
            });
            return {
                ...state,
                elements: newElements,
                elementIds: _.keys(newElements)
            }
        }
        case SET_CARS_STALE: {
            if (!state.showElements) {
                return {
                    ...state
                }
            }
            const newElements = {...state.elements};
            action.ids.forEach(id => {
                newElements[id].stale = true;
            })
            return {
                ...state,
                elements: newElements
            }
        }
        case DELETE_CARS: {
            const newElements = {...state.elements};
            action.ids.forEach(id => {
                delete newElements[id];
            });
            return {
                ...state,
                elements: newElements,
                elementIds: _.keys(newElements)
            }
        }
        case CLEAR_CARS: {
            return {
                ...state,
                elements: {},
                elementIds: []
            }
        }
        default:
            return state;
    }
}
