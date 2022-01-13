import {getSendMessageAction} from './webSocketActions';

export const SWITCH_SHOW_CARS = 'SWITCH_SHOW_CARS';
export const CARS_UPDATE = 'CARS_UPDATE';
export const SET_CARS_STALE = 'SET_CARS_STALE';
export const DELETE_CARS = 'DELETE_CARS';
export const CLEAR_CARS = 'CLEAR_CARS';

const MESSAGE_COMMANDS = {
    SHOW_CARS: 'SHOW_CARS',
    HIDE_CARS: 'HIDE_CARS'
}

function getSwitchShowCarsAction(value) {
    return {
        type: SWITCH_SHOW_CARS,
        value
    };
}

export function getElementsUpdateAction(events) {
    return {
        type: CARS_UPDATE,
        events
    };
}

export function getElementsDeleteAction(ids) {
    return {
        type: DELETE_CARS,
        ids
    };
}

export function getElementsSetStaleAction(ids) {
    return {
        type: SET_CARS_STALE,
        ids
    };
}

export function getClearCarsAction() {
    return {type: CLEAR_CARS};
}

export function switchShowCars(checked) {
    return dispatch => {
        dispatch(getSwitchShowCarsAction(checked));
        if (checked) {
            dispatch(getSendMessageAction(MESSAGE_COMMANDS.SHOW_CARS));
        } else {
            dispatch(getSendMessageAction(MESSAGE_COMMANDS.HIDE_CARS));
            dispatch(getClearCarsAction());
        }
    }
}
