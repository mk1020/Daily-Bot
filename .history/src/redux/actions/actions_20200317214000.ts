export const CLICK_SIGN_UP = 'CLICK_SIGN_UP';
export const CLICK_SIGN_IN = 'CLICK_SIGN_IN';
export const REGISTRATION = 'REGISTRATION';

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

type registration ={
	type: typeof REGISTRATION;
	status: boolean;
}

export const registration = (status)=>({type: REGISTRATION, status})

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

