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
			if (err) console.log(err);
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
		type userData = {
			Username: string;
			Pool: any;
		};
		const userData: userData = {
			Username: email,
			Pool: userPool,
		};
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: result => {
				const accessToken = result.getAccessToken().getJwtToken();
				AWS.config.region = REGION;
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'eu-central-1_7VyHQApew',
					Logins: {
						['cognito-idp.' +
						REGION +
						'.amazonaws.com/' +
						UserPoolId]: result.getIdToken().getJwtToken(),
					},
				});
				(AWS.config.credentials as AWS.CognitoIdentityCredentials).refresh(
					error => {
						if (error) console.log(error);
						else console.log('Successfully logged!');
					}
				);
			},
			onFailure: err => {},
		});
	});
};
