import * as types from '../actions/actions';

type SignIn= {
	changePass: boolean;
}
const initialState: SignIn = {
changePass: null
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
