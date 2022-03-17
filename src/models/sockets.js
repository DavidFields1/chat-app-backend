const { changeOnlineStatus } = require('../controllers/socketsController');
const { verifyJwt } = require('../helpers/jwt');

class Sockets {
	constructor(io) {
		this.io = io;
		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', async socket => {
			const token = socket.handshake.query['token'];
			const [isValid, uid] = verifyJwt(token);

			if (!isValid) {
				console.log('Invalid token');
				return socket.disconnect();
			}
			await changeOnlineStatus(uid, true);

			socket.on('disconnect', async () => {
				await changeOnlineStatus(uid, false);
			});
		});
	}
}

module.exports = Sockets;
