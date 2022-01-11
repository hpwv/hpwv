import {CAR_UPDATE, CLEAR_CARS, SWITCH_SHOW_CARS} from '../actions/carActions';

export const initialState = {
    showElements: false,
    elements: {}
};

export function carsReducer(state = initialState, action) {
    switch (action.type) {
        case SWITCH_SHOW_CARS: {
            return {
                ...state,
                showElements: action.value
            }
        }
        case CAR_UPDATE: {
            if (!state.showElements) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.element.id]: action.element
                }
            }
        }
        case CLEAR_CARS: {
            return {
                ...state,
                elements: {}
            }
        }
        default:
            return state;
    }
}
