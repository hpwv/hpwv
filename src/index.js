import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import App from './components/App';
import WebSocketWrapper from './components/WebSocketWrapper';
import './index.css';
import reportWebVitals from './reportWebVitals';
import socketMiddleware from './state/middleware/socketMiddleware';
import rootReducer, {initialState} from './state/reducers/rootReducer';

const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
let middlewares = [thunk, socketMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middlewares = [...middlewares, createLogger()];
}

export const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <WebSocketWrapper>
                <App/>
            </WebSocketWrapper>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
