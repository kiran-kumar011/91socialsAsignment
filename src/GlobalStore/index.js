import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk";
import { addUserData } from '../Reducer';



const rootReducer = combineReducers({
	userData : addUserData
});



const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);


export  const store = createStore(rootReducer, enhancer);