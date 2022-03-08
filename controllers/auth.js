const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJwt } = require("../helpers/jwt");

const createUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const uniqueEmail = await User.findOne({ email });
		if (uniqueEmail) {
			return res.status(400).json({
				status: 400,
				message: "Email already exists",
			});
		}

		// encrypt password
		const salt = bcrypt.genSaltSync();
		const hashedPassword = bcrypt.hashSync(password, salt);

		// add encrypted password to user
		const user = new User(req.body);
		user.password = hashedPassword;

		// save in db
		await user.save();

		// generate jwt
		const token = await generateJwt(user.id);

		// send response
		res.status(201).json({
			status: 201,
			message: "User created",
			user: user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 500,
			message: "Internal server error",
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// find user by email
		const user = await User.findOne({ email });

		// if user not found response with error
		if (!user) {
			return res.status(400).json({
				status: 400,
				message: "Email or password is incorrect",
			});
		}

		// compare password
		const isPasswordValid = bcrypt.compareSync(password, user.password);

		// if password is not valid response with error
		if (!isPasswordValid) {
			return res.status(400).json({
				status: 400,
				message: "Email or password is incorrect",
			});
		}

		// generate jwt
		const token = await generateJwt(user.id);

		// send response
		res.status(200).json({
			status: 200,
			message: "User logged in successfully",
			user: user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 500,
			message: "Internal server error",
		});
	}
};

const renewToken = async (req, res) => {
	const { uid } = req;

	// generate new jwt
	const token = await generateJwt(uid);

	// find user
	const user = await User.findById(uid);

	// send response
	res.json({
		status: 200,
		message: "Token renewed",
		user: user,
		token,
	});
};

module.exports = {
	createUser,
	loginUser,
	renewToken,
};
