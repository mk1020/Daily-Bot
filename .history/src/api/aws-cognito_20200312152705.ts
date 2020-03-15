import { resolve } from 'dns';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
	AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';

const REGION = 'eu-central-1';
const UserPoolId = 'eu-central-1_7VyHQApew';

type poolData = {
	UserPoolId: string;
	ClientId: string;
};
type userData = {
	Username: string;
	Pool: any;
};
const poolData: poolData = {
	UserPoolId: UserPoolId,
	ClientId: '2sqov0b8nuk4mhtfjoackulf0n',
};
const userPool = new CognitoUserPool(poolData);

export const signUpUser = (email: string, name: string, password: string) => {
	const signUpPromise = new Promise((resolve, reject) => {
		const attributeList = [];
		const Email = {
			Name: 'email',
			Value: email,
		};
		const Name = {
			Name: 'name',
			Value: name,
		};

		attributeList.push(new CognitoUserAttribute(Email));
		attributeList.push(new CognitoUserAttribute(Name));

		userPool.signUp(Email.Value, password, attributeList, null, (err, result) => {
			if (err) reject(err);
			else {
				resolve(Email.Value);
				console.log(result);
			}
		});
	});
	return signUpPromise;
};

export const signInUser = (email: string, password: string) => {
	const signInPromise = new Promise((resolve, reject) => {
		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password,
		});
		const USERPOOL: string =
			'cognito-idp.' + REGION + '.amazonaws.com/' + UserPoolId;

		const userData: userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: result => {
				AWS.config.region = REGION;
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'eu-central-1:c70bbba3-4025-4c6a-b1b3-ab90bd7ee7ad',
					Logins: {
						[USERPOOL]: result.getIdToken().getJwtToken(),
					},
				});
				(AWS.config.credentials as AWS.CognitoIdentityCredentials).refresh(
					error => {
						if (error) reject(error);
						else resolve(result.getAccessToken().getJwtToken());
					}
				);
			},
			onFailure: err => {
				alert(err.message || JSON.stringify(err));
			},
		});
	});
	return signInPromise;
};


export const forgotPassword = (email: string) => {
	const forgotPasswordPromise = new Promise((resolve, reject) => {
		const userData: userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);

		cognitoUser.forgotPassword({
			onSuccess: result => {
				resolve('success');
			},
			onFailure: err => {
				reject(err);
			},
			inputVerificationCode() {
				const verificationCode = prompt('Please input verification code ', '');
				const newPassword = prompt('Enter new password ', '');
				cognitoUser.confirmPassword(verificationCode, newPassword, this);
			},
		});
	});
	return forgotPasswordPromise;
};

export function signOutUser() {
	const signOutPromise = new Promise((resolve, reject) => {
		const cognitoUser = userPool.getCurrentUser();
		cognitoUser.signOut();
	});
	return signOutPromise;
}
