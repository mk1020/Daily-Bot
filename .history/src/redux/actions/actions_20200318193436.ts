export const CLICK_SIGN_UP = 'CLICK_SIGN_UP';
export const CLICK_SIGN_IN = 'CLICK_SIGN_IN';
export const REGISTRATION = 'REGISTRATION';
export const CHANGE_PASS = 'CHANGE_PASS';
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
};

export const registration = (status: boolean): Registration => ({
	type: REGISTRATION,
	status,
});

export const changePass =(status: boolean): ChangePass => ({
	type: CHANGE_PASS,
	status
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
