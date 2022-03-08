const jwt = require("jsonwebtoken");

const generateJwt = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		const options = { expiresIn: "6h" };
		jwt.sign(payload, process.env.JWT_KEY, options, (err, token) => {
			if (err) {
				console.log(err);
				reject("Error signing token");
			} else {
				resolve(token);
			}
		});
	});
};

module.exports = {
	generateJwt,
};
