import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

const poolData = {
	UserPoolId: 'eu-central-1_7VyHQApew',
	ClientId: '2sqov0b8nuk4mhtfjoackulf0n',
};

export const signUpUser = (email, name, password) => {
	const userPool = new CognitoUserPool(poolData);
	let attributeList = [];
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
		else console.log(result);
	});
};
