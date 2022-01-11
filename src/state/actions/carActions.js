import {getSendMessageAction} from './webSocketActions';

export const SWITCH_SHOW_CARS = 'SWITCH_SHOW_CARS';
export const CAR_UPDATE = 'CAR_UPDATE';
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

export function getElementUpdateAction(element) {
    return {
        type: CAR_UPDATE,
        element
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
