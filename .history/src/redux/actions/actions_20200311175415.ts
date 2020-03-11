import { CLICK_SIGN_UP } from './actions';
export const CLICK_SIGN_UP = 'CLICK_SIGN_UP';

export type ClickSignUp = {
	type: typeof CLICK_SIGN_UP;
	firstName: string;
	lastName: string;
	email: string;
	pass: string;
};

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
