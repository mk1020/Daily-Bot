import * as types from '../actions/actions';

interface SignIn {
	email: string;
}
const initialState: SignIn = {
	email: ndull,
};

export const signInReducer = (
	state = initialState,
	action
): SignIn => {
	switch (action.type) {
		case types.CLICK_SIGN_IN: {
		
			};
		
		default:
			return state;
	}
};
