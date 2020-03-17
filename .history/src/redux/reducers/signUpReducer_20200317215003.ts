import * as types from '../actions/actions';

interface SignUp {
	registration: boolean;
}

const initialState: SignUp = {
	registration: null,
};

export const signUpReducer = (
	state = initialState,
	action: types.Registration): SignUp => {
	switch (action.type) {
		case types.REGISTRATION: {
			return {...state, registration: action.status}
		}
		default:
			return state;
	}
};
