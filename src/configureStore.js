import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import todoApp from './reducers'


console.log("alla");
const configureStore = () => {
    const middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    //function, which applies middlewares
    return createStore(todoApp, applyMiddleware(...middlewares));

};

export default configureStore