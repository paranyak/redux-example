import { createStore } from 'redux'
import throttle from 'lodash/throttle'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'


const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch
    }
    return (action) => {
        console.group(action.type);
        console.log('prev state', store.getState());
        console.log('action', action);
        const returnValue = rawDispatch(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
};


const configureStore = () => {
    const store = createStore(todoApp);

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    return store;
};

export default configureStore