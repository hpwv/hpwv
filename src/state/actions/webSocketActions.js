export const WS_CONNECT = 'WS_CONNECT';
export const WS_CONNECTED = 'WS_CONNECTED';
export const WS_DISCONNECT = 'WS_DISCONNECT';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export function getConnectAction() {
    return {type: WS_CONNECT};
}

export function getDisconnectAction(message) {
    return {
        type: WS_DISCONNECT,
        message
    };
}

export function getConnectedAction(message) {
    return {
        type: WS_CONNECTED,
        message
    };
}

export function getSendMessageAction(message) {
    return {
        type: WS_SEND_MESSAGE,
        message
    };
}
