const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
	try {
		const token = req.header("x-token");

		if (!token) {
			return res.status(401).json({
				status: 401,
				message: "Unauthorized",
			});
		}

		const payload = jwt.verify(token, process.env.JWT_KEY);
		req.uid = payload.uid;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 500,
			message: "Internal server error",
		});
	}
};

module.exports = {
	verifyJwt,
};
