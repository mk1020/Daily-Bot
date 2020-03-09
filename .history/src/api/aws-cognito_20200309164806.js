import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';
import { resolve } from 'dns';
import { rejects } from 'assert';

const poolData = {
	UserPoolId: 'eu-central-1_7VyHQApew',
	ClientId: '2sqov0b8nuk4mhtfjoackulf0n',
};

export const signUpUser = (email, name, password) => {
	const signUpPromise = new Promise((resolve, reject) => {
		const userPool = new CognitoUserPool(poolData);
		const attributeList = [];
		const email = {
			Name: 'email',
			Value: email,
		};
		const name = {
			Name: 'name',
			Value: name,
		};

		attributeList.push(new CognitoUserAttribute(email));
		attributeList.push(new CognitoUserAttribute(name));

		userPool.signUp(email.Value, password, attributeList, null, (err, result) => {
			if (err) console.log(err);
			else {
				resolve(email.Value);
				console.log(result);
			}
		});
	});
	return p;
};

export const signInUser = () => {
	const signInPromise = new Promise ((resolve, reject)=> {
		const authenticationDetails = new AuthenticationDetails({
			Username: email,
			Password: password
		   })
	})
};
