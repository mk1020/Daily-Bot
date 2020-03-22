import * as types from '../actions/actions';

interface SignUp {
	registration: boolean;
}

const initialState: SignUp = {
	registration: null,
};

export const signUpReducer = (
	state = initialState,
	action): SignUp => {
	switch (action.type) {
		case types.REGISTRATION: {
			return {...state, registration: action.status}
		}
		case types.DEFAULT_STATE: {
			return {...state, registration: null}
		}
		default:
			return state;
	}
};
