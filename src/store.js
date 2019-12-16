import { createStore, combineReducers } from 'redux';

const rc = require.context('./reducers', false, /\.js$/);

const reducerObj = rc.keys().reduce((obj, key) => {
  const reducerFunc = rc(key).default;
  obj[reducerFunc.name] = reducerFunc;
  return obj;
}, {});

const rootReducer = combineReducers(reducerObj);

const store = createStore(rootReducer);

export default store;
