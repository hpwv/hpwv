import {getSendMessageAction} from './webSocketActions';

export const SWITCH_SHOW_PEDESTRIANS = 'SWITCH_SHOW_PEDESTRIANS';
export const PEDESTRIANS_UPDATE = 'PEDESTRIANS_UPDATE';
export const SET_PEDESTRIANS_STALE = 'SET_PEDESTRIANS_STALE';
export const DELETE_PEDESTRIANS = 'DELETE_PEDESTRIANS';
export const CLEAR_PEDESTRIANS = 'CLEAR_PEDESTRIANS';

const MESSAGE_COMMANDS = {
    SHOW_PEDESTRIANS: 'SHOW_PEDESTRIANS',
    HIDE_PEDESTRIANS: 'HIDE_PEDESTRIANS'
}

function getSwitchShowPedestriansAction(value) {
    return {
        type: SWITCH_SHOW_PEDESTRIANS,
        value
    };
}

export function getElementsUpdateAction(events) {
    return {
        type: PEDESTRIANS_UPDATE,
        events
    };
}

export function getElementsDeleteAction(ids) {
    return {
        type: DELETE_PEDESTRIANS,
        ids
    };
}

export function getElementsSetStaleAction(ids) {
    return {
        type: SET_PEDESTRIANS_STALE,
        ids
    };
}

export function getClearPedestriansAction() {
    return {type: CLEAR_PEDESTRIANS};
}

export function switchShowPedestrians(checked) {
    return dispatch => {
        dispatch(getSwitchShowPedestriansAction(checked));
        if (checked) {
            dispatch(getSendMessageAction(MESSAGE_COMMANDS.SHOW_PEDESTRIANS));
        } else {
            dispatch(getSendMessageAction(MESSAGE_COMMANDS.HIDE_PEDESTRIANS));
            dispatch(getClearPedestriansAction());
        }
    }
}
