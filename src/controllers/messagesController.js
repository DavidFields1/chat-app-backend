const {
	Types: { ObjectId }
} = require('mongoose');
const Message = require('../models/message');

const getMessages = async (req, res) => {
	try {
		const userId = req.uid;
		const toUserId = req.params.id;

		const objectId = new ObjectId(toUserId);
		const isValidId = ObjectId.isValid(objectId);

		if (!isValidId) {
			return res.status(400).json({
				status: 400,
				message: 'Invalid user id'
			});
		}

		const lastMessages = await Message.find({
			$or: [
				{ from: userId, to: toUserId },
				{ from: toUserId, to: userId }
			]
		})
			.sort({ createdAt: 'desc' })
			.limit(30);
		console.log(lastMessages);
		res.json({
			status: 200,
			message: lastMessages
		});
	} catch (error) {
		res.status(500).json({
			message: 'Server error'
		});
	}
};

module.exports = {
	getMessages
};
