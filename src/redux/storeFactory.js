import { createStore } from 'redux';

let store = null;

/**
 * Creates store and returns it
 * @param {Function} reducer 
 * @returns {Object}
 */
export const factory = (reducer) => {
    store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}

/**
 * Returns store
 * @returns {Object}
 */
export const getStore = () => store;
