const jwt = require('jsonwebtoken');

const generateJwt = uid => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		const options = { expiresIn: '1d' };
		jwt.sign(payload, process.env.JWT_KEY, options, (err, token) => {
			if (err) {
				console.log(err);
				reject('Error signing token');
			} else {
				resolve(token);
			}
		});
	});
};

const verifyJwt = token => {
	try {
		const { uid } = jwt.verify(token, process.env.JWT_KEY);
		return [true, uid];
	} catch (err) {
		// console.log(err);
		return [false, null];
	}
};

module.exports = {
	generateJwt,
	verifyJwt
};
