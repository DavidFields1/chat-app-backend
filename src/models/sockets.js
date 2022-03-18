const { changeOnlineStatus, getUsers, saveMessage } = require('../controllers/socketsController');
const { verifyJwt } = require('../helpers/jwt');

class Sockets {
	constructor(io) {
		this.io = io;
		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', async socket => {
			// get and validate token
			const token = socket.handshake.query['token'];
			const [isValid, uid] = verifyJwt(token);

			// if not valid disconnect
			if (!isValid) {
				console.log('Invalid token');
				return socket.disconnect();
			}
			await changeOnlineStatus(uid, true);

			// join room with user id
			socket.join(uid);

			// listen private message
			socket.on('private-message', async data => {
				const message = await saveMessage(data);

				// send message to receiver
				this.io.to(data.to).emit('private-message', message);
				this.io.to(data.from).emit('private-message', message);
			});

			// emit all users list
			this.io.emit('get-users', await getUsers(uid));

			// On disconnect
			socket.on('disconnect', async () => {
				await changeOnlineStatus(uid, false);
				this.io.emit('get-users', await getUsers(uid));
			});
		});
	}
}

module.exports = Sockets;
