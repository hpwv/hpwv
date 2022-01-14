import {getSendMessageAction} from './webSocketActions';

export const SWITCH_SHOW_BIKES = 'SWITCH_SHOW_BIKES';
export const BIKES_UPDATE = 'BIKES_UPDATE';
export const SET_BIKES_STALE = 'SET_BIKES_STALE';
export const DELETE_BIKES = 'DELETE_BIKES';
export const CLEAR_BIKES = 'CLEAR_BIKES';

const MESSAGE_COMMANDS = {
    SHOW_BIKES: 'SHOW_BIKES',
    HIDE_BIKES: 'HIDE_BIKES'
}

function getSwitchShowBikesAction(value) {
    return {
        type: SWITCH_SHOW_BIKES,
        value
    };
}

export function getElementsUpdateAction(events) {
    return {
        type: BIKES_UPDATE,
        events
    };
}

export function getElementsDeleteAction(ids) {
    return {
        type: DELETE_BIKES,
        ids
    };
}

export function getElementsSetStaleAction(ids) {
    return {
        type: SET_BIKES_STALE,
        ids
    };
}

export function getClearBikesAction() {
    return {type: CLEAR_BIKES};
}

export function switchShowBikes(checked) {
    return dispatch => {
        dispatch(getSwitchShowBikesAction(checked));
        if (checked) {
            dispatch(getSendMessageAction(MESSAGE_COMMANDS.SHOW_BIKES));
        } else {
            dispatch(getSendMessageAction(MESSAGE_COMMANDS.HIDE_BIKES));
            dispatch(getClearBikesAction());
        }
    }
}
