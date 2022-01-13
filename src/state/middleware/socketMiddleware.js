import _ from 'lodash';
import socketio from 'socket.io-client';
import {logger} from '../../utils/logger';
import * as carActions from '../actions/carActions';
import {CONNECT, DISCONNECT, getDisconnectAction, SEND_MESSAGE} from '../actions/webSocketActions';

const PAYLOAD_TYPES = {
    CARS: 'car',
    BIKES: 'bike'
}

const socketMiddleware = () => {
    let socket = null,
        cleanupInterval,
        updateInterval,
        carUpdates = {};

    const onMessage = () => (message) => {
        switch (message.element.type) {
            case PAYLOAD_TYPES.CARS:
                carUpdates[message.element.id] = message;
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

                cleanupInterval = setInterval(() => {
                    const staleCars = [],
                        carsToDelete = [];
                    store.getState().cars.elementIds.forEach(id => {
                        const now = Date.now(),
                            element = store.getState().cars.elements[id];
                        if (now - element.timestamp > 10000) {
                            carsToDelete.push(id);
                            delete carUpdates[id];
                        } else if (now - element.timestamp > 4000 && !element.stale) {
                            staleCars.push(id);
                        }
                    });
                    if (staleCars.length > 0) {
                        store.dispatch(carActions.getElementsSetStaleAction(staleCars));
                    }
                    if (carsToDelete.length > 0) {
                        store.dispatch(carActions.getElementsDeleteAction(carsToDelete));
                    }
                }, 1000);

                updateInterval = setInterval(() => {
                    const events = _.values(carUpdates);
                    carUpdates = {};
                    if (events.length > 0) {
                        store.dispatch(carActions.getElementsUpdateAction(events));
                    }
                }, 50);

                socket.on('message', onMessage());
                socket.on('disconnect', onDisconnect(store));
                break;
            case DISCONNECT:
                logger.info('WebSocket disconnected', action.message);

                clearInterval(updateInterval);
                clearInterval(cleanupInterval);

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
