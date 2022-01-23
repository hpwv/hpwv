import _ from 'lodash';
import socketio from 'socket.io-client';
import {logger} from '../../utils/logger';
import * as bikeActions from '../actions/bikeActions';
import * as carActions from '../actions/carActions';
import * as pedestrianActions from '../actions/pedestrianActions';
import {
    getConnectedAction,
    getDisconnectAction,
    WS_CONNECT,
    WS_DISCONNECT,
    WS_SEND_MESSAGE
} from '../actions/webSocketActions';

const ACTIONS_BY_TYPE = {
    car: carActions,
    bike: bikeActions,
    pedestrian: pedestrianActions
}

const socketMiddleware = () => {
    let socket = null,
        cleanupInterval,
        updateIntervals = [],
        elementUpdates = {
            car: {},
            bike: {},
            pedestrian: {}
        };

    const onMessage = () => (message) => {
        elementUpdates[message.element.type][message.element.id] = message;
    }

    const onDisconnect = store => (message) => {
        store.dispatch(getDisconnectAction(message));
    };

    const onConnect = store => (message) => {
        store.dispatch(getConnectedAction(message));
    };

    const onUpdate = (store, type) => {
        const events = _.values(elementUpdates[type]);
        elementUpdates[type] = {};
        if (events.length > 0) {
            const {getElementsUpdateAction} = ACTIONS_BY_TYPE[type];
            store.dispatch(getElementsUpdateAction(events));
        }
    }

    const refreshHandler = (store, type) => {
        const staleElements = [],
            elementsToDelete = [];

        store.getState()[type].elementIds.forEach(id => {
            const now = Date.now(),
                element = store.getState()[type].elements[id];
            if (now - element.timestamp > 10000) {
                elementsToDelete.push(id);
                delete elementUpdates[type][id];
            } else if (now - element.timestamp > 5000 && !element.stale) {
                staleElements.push(id);
            }
        });
        if (staleElements.length > 0) {
            const {getElementsSetStaleAction} = ACTIONS_BY_TYPE[type];
            store.dispatch(getElementsSetStaleAction(staleElements));
        }
        if (elementsToDelete.length > 0) {
            const {getElementsDeleteAction} = ACTIONS_BY_TYPE[type];
            store.dispatch(getElementsDeleteAction(elementsToDelete));
        }
    }

    return store => next => action => {
        switch (action.type) {
            case WS_CONNECT:
                logger.info('WebSocket connecting to ', window.ENV.app.webSocketUrl);
                if (socket !== null) {
                    socket.close();
                }
                socket = socketio.connect(window.ENV.app.webSocketUrl, {
                    transports: ['websocket']
                });

                cleanupInterval = setInterval(() => {
                    refreshHandler(store, 'car');
                    refreshHandler(store, 'bike');
                    refreshHandler(store, 'pedestrian');
                }, 1000);

                updateIntervals.push(setInterval(() => onUpdate(store, 'car'), 100));
                updateIntervals.push(setInterval(() => onUpdate(store, 'bike'), 250));
                updateIntervals.push(setInterval(() => onUpdate(store, 'pedestrian'), 350));

                socket.on('message', onMessage());
                socket.on('disconnect', onDisconnect(store));
                socket.on('connect', onConnect(store));
                return next(action);
            case WS_DISCONNECT:
                logger.info('WebSocket disconnected', action.message);

                updateIntervals.forEach(it => clearInterval(it));
                updateIntervals = [];
                clearInterval(cleanupInterval);

                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                return next(action);
            case WS_SEND_MESSAGE:
                logger.debug('WebSocket send message', action.message);

                socket.send(action.message);
                break;
            default:
                return next(action);
        }
    };
};

export default socketMiddleware();
