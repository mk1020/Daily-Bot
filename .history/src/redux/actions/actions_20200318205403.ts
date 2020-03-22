import { defaultState } from './../../../.history/src/redux/actions/actions_20200318205121';
export const CLICK_SIGN_UP = 'CLICK_SIGN_UP';
export const CLICK_SIGN_IN = 'CLICK_SIGN_IN';
export const REGISTRATION = 'REGISTRATION';
export const CHANGE_PASS = 'CHANGE_PASS';
export const FORGOT_PASS = 'FORGOT_PASS';
export const DEFAULT_STATE ='DEFAULT_STATE'; 

type ClickSignUp = {
	type: typeof CLICK_SIGN_UP;
	firstName: string;
	lastName: string;
	email: string;
	pass: string;
};
type ClickSignIn = {
	type: typeof CLICK_SIGN_IN;
	email: string;
	pass: string;
};

export type Registration = {
	type: typeof REGISTRATION;
	status: boolean;
};

export type ChangePass = {
	type: typeof CHANGE_PASS;
	status: boolean;
	err: null | string;
};

export type ForgotPass = {
	type: typeof FORGOT_PASS;
};
export type DefaultState = {
	type: typeof DEFAULT_STATE;
};

export const registration = (status: boolean): Registration => ({
	type: REGISTRATION,
	status,
});

export const changePass =(status: boolean, err: null | string): ChangePass => ({
	type: CHANGE_PASS,
	status,
	err
})

export const forgot_pass = (): ForgotPass => ({
	type: FORGOT_PASS
})
export const defaultState = (): DefaultState => ({
	type: DEFAULT_STATE
})
export const clickSignUp = (
	firstName: string,
	lastName: string,
	email: string,
	pass: string
): ClickSignUp => ({
	type: CLICK_SIGN_UP,
	firstName,
	lastName,
	email,
	pass,
});

export const clickSignIn = (email: string, pass: string): ClickSignIn => ({
	type: CLICK_SIGN_IN,
	email,
	pass,
});
