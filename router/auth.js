// ! PATH: api/login

const { Router } = require("express");
const { check } = require("express-validator");
// controllers
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { errorsInResponse } = require("../middlewares/errorsInResponse");
const { verifyJwt } = require("../middlewares/verifyJwt");

const router = Router();

// * GET api/login/ -> user login
router.post(
	"/",
	[
		check("email", "Email is required").notEmpty().isEmail().bail(),
		check("password", "Password is required")
			.notEmpty()
			.isLength({ min: 6 })
			.bail(),
		errorsInResponse,
	],
	loginUser
);

// * POST /api/login/new -> create a new user
router.post(
	"/new",
	[
		check("name", "Name is required").not().isEmpty().isString().bail(),
		check("email", "Email is required").notEmpty().isEmail().bail(),
		check("password", "Password is required")
			.notEmpty()
			.isLength({ min: 6 })
			.bail(),
		errorsInResponse,
	],
	createUser
);

// * GET api/login/renew -> renew token
router.get("/renew", verifyJwt, renewToken);

module.exports = router;
