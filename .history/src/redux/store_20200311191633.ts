import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { signInReducer } from './reducers/signInReducer';
import { signUpReducer } from './reducers/signUpReducer';

const reducers = combineReducers({ signInReducer,  });

const store = createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(thunkMiddleware)
		// other store enhancers if any
	)
);

export default store;
