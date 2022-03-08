// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");
const Sockets = require("./sockets");
const dbConnection = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// database connection
		dbConnection();

		// Http server
		this.server = http.createServer(this.app);

		// sockets config
		this.io = socketio(this.server, {
			/* configuraciones */
		});
	}

	middlewares() {
		// deploy public
		this.app.use(express.static(path.resolve(__dirname, "../public")));

		// cors
		this.app.use(cors());

		// body parser
		this.app.use(express.json());

		// API endopoints
		this.app.use("/api/login", require("../router/auth"));
	}

	// the config could be a method or a property of the class
	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		// init Middlewares
		this.middlewares();

		// init sockets
		this.configurarSockets();

		// init Server
		this.server.listen(this.port, () => {
			console.log("Server running on port: ", this.port);
		});
	}
}

module.exports = Server;
