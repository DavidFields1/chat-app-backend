const User = require('../models/user');

const changeOnlineStatus = async (uid, status) => {
	const user = await User.findById(uid);
	user.isOnline = status;
	await user.save();

	return user;
};

module.exports = {
	changeOnlineStatus
};
