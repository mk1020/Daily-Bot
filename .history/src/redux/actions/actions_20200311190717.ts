export const CLICK_SIGN_UP = 'CLICK_SIGN_UP';
export const CLICK_SIGN_IN = 'CLICK_SIGN_IN';

export type ClickSignUp = {
	type: typeof CLICK_SIGN_UP;
	firstName: string;
	lastName: string;
	email: string;
	pass: string;
};
export type ClickSignIn = {
	type: typeof CLICK_SIGN_IN;
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

export const clickSignIn = (email: string, pass: string): ClickSignIn => ({
	type: CLICK_SIGN_IN,
	email,
	pass
})