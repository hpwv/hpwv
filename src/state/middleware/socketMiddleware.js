import socketio from 'socket.io-client';
import {logger} from '../../utils/logger';
import {getElementUpdateAction} from '../actions/carActions';
import {CONNECT, DISCONNECT, getDisconnectAction, SEND_MESSAGE} from '../actions/webSocketActions';

const PAYLOAD_TYPES = {
    CARS: 'car',
    BIKES: 'bike'
}

const socketMiddleware = () => {
    let socket = null;

    const onMessage = store => (message) => {
        switch (message.type) {
            case PAYLOAD_TYPES.CARS:
                store.dispatch(getElementUpdateAction(message));
                break;
            default:
                break;
        }
    }

    const onDisconnect = store => (message) => {
        store.dispatch(getDisconnectAction(message));
    };

    return store => next => action => {
        switch (action.type) {
            case CONNECT:
                logger.info('WebSocket connecting to ', window.ENV.app.webSocketUrl);
                if (socket !== null) {
                    socket.close();
                }
                socket = socketio.connect(window.ENV.app.webSocketUrl, {
                    transports: ['websocket']
                });

                socket.on('message', onMessage(store));
                socket.on('disconnect', onDisconnect(store));
                break;
            case DISCONNECT:
                logger.info('WebSocket disconnected', action.message);

                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;
            case SEND_MESSAGE:
                logger.debug('WebSocket send message', action.message);

                socket.send(action.message);
                break;
            default:
                return next(action);
        }
    };
};

export default socketMiddleware();
