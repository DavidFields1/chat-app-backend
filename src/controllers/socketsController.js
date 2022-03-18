const User = require('../models/user');
const Message = require('../models/message');

const changeOnlineStatus = async (uid, status) => {
	const user = await User.findById(uid);
	user.isOnline = status;
	await user.save();

	return user;
};

const getUsers = async () => {
	const users = await User.find().sort('online');
	return users;
};

const saveMessage = async data => {
	try {
		const message = new Message(data);
		await message.save();

		return message;
	} catch (e) {
		console.log(e);
		return false;
	}
};

module.exports = {
	changeOnlineStatus,
	getUsers,
	saveMessage
};
