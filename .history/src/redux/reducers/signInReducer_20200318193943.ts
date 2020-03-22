import * as types from '../actions/actions';

interface SignIn {
	changePass: boolean;
}
const initialState: SignIn = {
	changePass: null,
};

export const signInReducer = (
	state = initialState,
	action: types.ChangePass
): SignIn => {
	switch (action.type) {
		case types.CHANGE_PASS: {
			return { ...state, changePass: action.status };
		}

		default:
			return state;
	}
};
