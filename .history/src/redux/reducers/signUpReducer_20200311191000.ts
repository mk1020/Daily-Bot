import * as types from '../actions/actions';

interface SignUp {
	firstName: string;
	lastName: string;
	email: string;
	pass: string;
	registration: boolean;
}
const initialState: SignUp = {
	firstName: null,
	lastName: null,
	email: null,
	pass: null,
	registration: null
};
export const signInReducer = (
	state = initialState,
	action: types.ClickSignUp
): SignUp => {debugger
	switch (action.type) {
		case types.CLICK_SIGN_UP: {
			debugger
			return {
				...state,
				firstName: action.firstName,
				lastName: action.lastName,
				email: action.email,
				pass: action.pass,
			};
		}
		default:
			return state;
	}
};
