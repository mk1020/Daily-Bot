import * as types from '../actions/actions';

interface SignIn {
	changePass: null | boolean;
	errChangePass: null | string
}
const initialState: SignIn = {
	changePass: null,
	errChangePass: null
};

export const signInReducer = (
	state = initialState,
	action: types.ChangePass
): SignIn => {
	switch (action.type) {
		case types.CHANGE_PASS: {
			return { ...state, changePass: action.status, errChangePass: action.err };
		}

		default:
			return state;
	}
};
