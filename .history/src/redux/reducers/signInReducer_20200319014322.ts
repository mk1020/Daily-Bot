import * as types from '../actions/actions';

interface SignIn {
	changePass: null | boolean;
	errChangePass: null | string;
	resetPassStart: null | boolean;
}
const initialState: SignIn = {
	changePass: null,
	errChangePass: null,
	resetPassStart: null
};

export const signInReducer = (
	state = initialState,
	action
): SignIn => {
	switch (action.type) {
		case types.CHANGE_PASS: {
			return { ...state, changePass: action.status, errChangePass: action.err };
		}
		case types.FORGOT_PASS: {
			return {...state, changePass: null, errChangePass: null}
		}
		case types.RESET_PASS_START: {
			return {...state, resetPassStart: true}
		}

		default:
			return state;
	}
};
