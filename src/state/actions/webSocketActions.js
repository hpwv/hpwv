export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export function getConnectAction() {
    return {type: CONNECT};
}

export function getDisconnectAction(message) {
    return {
        type: DISCONNECT,
        message
    };
}

export function getSendMessageAction(message) {
    return {
        type: SEND_MESSAGE,
        message
    };
}
