const mongoose = require('mongoose');

const dbConnection = () => {
	try {
		mongoose.connect(process.env.DB_CNN_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: process.env.DB_NAME
		});
		console.log('Succesfully connected to the database');
	} catch (error) {
		console.log(error);
		throw new Error('Database connection error');
	}
};

module.exports = dbConnection;
