import * as types from '../actions/actions';

interface SignIn {
	email: string;
	pass: string;
}
const initialState: SignIn = {
	email: null,
	pass: null,
};

export const signInReducer = (
	state = initialState,
	action: types.ClickSignIn
): SignIn => {
	switch (action.type) {
		case types.CLICK_SIGN_IN: {
			return {
				...state,
				email: action.email,
				pass: action.pass,
			};
		}
		default:
			return state;
	}
};
